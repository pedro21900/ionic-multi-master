import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

import {
    CapacitorSQLite,
    capEchoResult,
    capSQLiteChanges,
    capSQLiteResult,
    capSQLiteSet,
    JsonSQLite,
    SQLiteConnection,
    SQLiteDBConnection
} from '@capacitor-community/sqlite';
import {Capacitor} from '@capacitor/core';
import {ErrorHandlerException} from '../@core/handlers/error-handler-exception';
import {Preferences} from '@capacitor/preferences';

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

@Injectable({
    providedIn: 'root'
})

export class SQLiteService {

    public dbReady = new BehaviorSubject(false);

    public dbName: string;

    sqlite: SQLiteConnection;

    isService: boolean = false;

    platform: string;

    sqlitePlugin: any;

    native: boolean = false;

    constructor(
        private http: HttpClient) {
    }
    /**
     * Plugin Initialization
     */
    initializePlugin(): Promise<boolean> {
        return new Promise(resolve => {
            this.platform = Capacitor.getPlatform();
            if (this.platform === 'ios' || this.platform === 'android') {
                this.native = true;
            }
            this.sqlitePlugin = CapacitorSQLite;
            this.sqlite = new SQLiteConnection(this.sqlitePlugin);
            this.isService = true;
            resolve(true);
        });
    }


    async echo(value: string): Promise<capEchoResult> {
        if (this.sqlite != null) {
            try {
                const ret = await this.sqlite.echo(value);
                return Promise.resolve(ret);
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error('no connection open'));
        }
    }

    /**
     * addUpgradeStatement
     * @param database
     * @param fromVersion
     * @param toVersion
     * @param statement
     * @param set
     */
    async addUpgradeStatement(database: string, fromVersion: number,
                              toVersion: number, statement: string,
                              set?: capSQLiteSet[])
        : Promise<void> {
        if (this.sqlite != null) {
            try {
                // await this.sqlite.addUpgradeStatement(database, fromVersion, toVersion,
                //     statement, set ? set : []);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    /**
     * Create a connection to a database
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     */
    async createConnection(database: string, encrypted: boolean,
                           mode: string, version: number,readOnly:boolean
    ): Promise<SQLiteDBConnection> {
        if (this.sqlite != null) {
            try {
                const db: SQLiteDBConnection = await this.sqlite.createConnection(
                    database, encrypted, mode, version,readOnly);
                if (db != null) {
                    return Promise.resolve(db);
                } else {
                    return Promise.reject(new Error(`no db returned is null`));
                }
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    /**
     * Close a connection to a database
     * @param database
     */
    async closeConnection(database: string): Promise<void> {
        if (this.sqlite != null) {
            try {
                await this.sqlite.closeConnection(database,false);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    /**
     * Close all existing connections
     */
    async closeAllConnections(): Promise<void> {
        if (this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.closeAllConnections());
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Import from a Json Object
     * @param jsonstring
     */
    async importFromJson(jsonstring: string): Promise<capSQLiteChanges> {
        if (this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.importFromJson(jsonstring));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }

    }

    /**
     * Is Json Object Valid
     * @param jsonstring Check the validity of a given Json Object
     */

    async isJsonValid(jsonstring: string): Promise<capSQLiteResult> {
        if (this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.isJsonValid(jsonstring));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }

    }

    /**
     * Check if connection exists
     * @param database
     */
    async isConnection(database: string): Promise<capSQLiteResult> {
        if (this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.isConnection(database,false));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Retrieve an existing connection to a database
     * @param database
     */
    async retrieveConnection(database: string):
        Promise<SQLiteDBConnection> {
        if (this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.retrieveConnection(database,false));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    // Potentially build this out to an update logic:
    // Sync your data on every app start and update the device DB
    public async downloadDatabaseFromRequestParam(update = false,url:string,object:any) {
        const dbImport = await this.http.post<JsonSQLite>(url,object).toPromise();
        const jsonstring = JSON.stringify(dbImport);
        const isValid = await this.isJsonValid(jsonstring);

        if (isValid.result) {
            this.dbName = dbImport.database;
            await Preferences.set({key:DB_NAME_KEY, value:this.dbName});

            await this.importFromJson(jsonstring);
            await Preferences.set({key:DB_SETUP_KEY, value:'1'});

            // Your potential logic to detect offline changes later
            await this.syncTables(update, this.dbName);
            this.dbReady.next(true);
        }

    }

    // Potentially build this out to an update logic:
    // Sync your data on every app start and update the device DB
    public async downloadDatabase(update = false,url:string) {
        const dbImport = await this.http.get<JsonSQLite>(url).toPromise();
        const jsonstring = JSON.stringify(dbImport);
        const isValid = await this.isJsonValid(jsonstring);

        if (isValid.result) {
            this.dbName = dbImport.database;
            await Preferences.set({key:DB_NAME_KEY, value:this.dbName});

            await this.importFromJson(jsonstring);
            await Preferences.set({key:DB_SETUP_KEY, value:'1'});

            // Your potential logic to detect offline changes later
            await this.syncTables(update, this.dbName);
            this.dbReady.next(true);
        }

    }

    async syncTables(update = false, database: string) {
        const connection = await this.dbConection(database);
        connection.open();
        if (!update) {
            await connection.createSyncTable();

        } else {
            await connection.setSyncDate(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString());
        }
        connection.close();
        this.closeConnection(database);
    }

   public async dbConection(database: string): Promise<SQLiteDBConnection> {
        // try {
        //   return Promise.resolve(await this.createConnection(database, false, "no-encryption", 1));
        // } catch (err) {
        //   return Promise.reject(await this.retrieveConnection(database));
        // }
        const isConected = await this.isConnection(database);
        if (isConected.result) {
            return await this.retrieveConnection(database);
        } else {
            return await this.createConnection(database, false, 'no-encryption', 1,false);
        }
    }

    public async exportFromJson(database: string, jsonexportmode: string): Promise<JsonSQLite> {
        const db = await this.retrieveConnection(database);
        db.open();
        const syncExport = await CapacitorSQLite.exportToJson({database, jsonexportmode: jsonexportmode});
        return syncExport.export;
    }

}

