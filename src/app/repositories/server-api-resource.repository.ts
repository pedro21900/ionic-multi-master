import {Injectable} from '@angular/core';
import {CapacitorSQLite, DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {SQLiteService} from '../services/sql-lite.service';
import {DatabaseService} from '../services/database.service';
import {Especie} from '../domain/especie';



@Injectable({
  providedIn: 'root'
})
export class ServerApiResourceRepository {


  constructor(private _databaseService: DatabaseService) {
  }
  async findAll(): Promise<any> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbEspecie: DBSQLiteValues = await db.query("select * from tb_estado");
      return tbEspecie.values ;
    });
  }

}
