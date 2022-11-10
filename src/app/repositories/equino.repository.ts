import {Injectable} from '@angular/core';
import {DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {objectKeysToCamelCaseV2, objectKeysToSnakeCaseV2} from 'keys-converter';
import {Equino} from '../domain/equino';
import {DatabaseService} from '../services/database.service';
import {v4 as uuidv4} from 'uuid';
import {VwEquino} from '../pages/equino/equino-list/equino-list-page.component';

@Injectable({
    providedIn: 'root'
})
export class EquinoRepository {


    constructor(private _databaseService: DatabaseService) {

    }

    async findAll(): Promise<VwEquino[]> {
        return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            var tbEquino: DBSQLiteValues = await db.query('select * from vw_equino_list');
            return tbEquino.values.map(equino => objectKeysToCamelCaseV2(equino));
        });
    }

    async insert(equino: Equino) {
        console.log(equino);
        return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const keys: string[] = Object.keys(objectKeysToSnakeCaseV2(equino));
            const values: string[] = Object.values(equino);
            let sqlcmd: string = `insert into tb_equino (id, ${keys.toString()})
                                  values (1, ${keys.map(x => '?')})`;
            let ret: any = await db.run(sqlcmd, values);
            if (ret.changes.lastId > 0) {
                return objectKeysToCamelCaseV2(ret.changes as Equino);
            }
            throw Error('create equino failed');
        });
    }

    async update(equino: Equino) {
        const keys: string[] = Object.keys(objectKeysToSnakeCaseV2(equino));
        const values: string[] = Object.values(equino);

        return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let sqlcmd: string = `update tb_equino
                                  set ${keys.map(key => `${key} = ?`)}
                                  where id = ${equino.id}`;
            let ret: any = await db.run(sqlcmd, values);
            if (ret.changes.changes > 0) {
                return await this.findById(equino.id);
            }
            throw Error('update equino failed');
        });
    }

    async findById(id: number): Promise<Equino> {
        return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let sqlcmd: string = 'select * from tb_equino where id = ? limit 1';
            let values: Array<any> = [id];
            let ret: any = await db.query(sqlcmd, values);
            if (ret.values.length > 0) {
                return objectKeysToCamelCaseV2(ret.values[0] as Equino);
            }
            throw Error('get equino by id failed');
        });
    }

    async deleteById(id: string): Promise<void> {
        return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            await db.query(`delete
                            from tb_equino
                            where id = '${id}';`);
        });
    }


    // async createTestData(): Promise<any> {
    //   await this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    //     //delete all tb_equino
    //     let sqlcmd: string = "DELETE FROM tb_equino;";
    //     await db.execute(sqlcmd, false);
    //   });
    //
    //   let tb_equino: Equino[] = tb_equinoData;
    //
    //   for (let equino of tb_equino) {
    //     await this.createEquino(equino);
    //   }
    // }

    async findAllByExpPecEquideos(idExpPecEquideo: number): Promise<VwEquino[]> {
        return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            var tbEquino: DBSQLiteValues = await db.query(`select *
                                                           from vw_equino_list
                                                           where cd_exploracao_pecuaria = ${idExpPecEquideo}`);
            return tbEquino.values.map(equino => objectKeysToCamelCaseV2(equino));
        });
    }

    async findByDsIdentificacaoAnimal(dsIdentificacaoAnimal: string): Promise<VwEquino[]> {
        return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            var tbEquino: DBSQLiteValues = await db.query(`select *
                                                           from vw_equino_list
                                                           where ds_identificacao_animal like '%${dsIdentificacaoAnimal}%'`);
            return tbEquino.values.map(equino => objectKeysToCamelCaseV2(equino));
        });
    }
}

