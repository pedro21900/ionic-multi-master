import {Injectable} from '@angular/core';
import {CapacitorSQLite, DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {SQLiteService} from '../services/sql-lite.service';
import {objectKeysToCamelCaseV2, objectKeysToSnakeCaseV2} from 'keys-converter';
import {Especie} from '../domain/especie';
import {Equino} from '../domain/equino';
import {DatabaseService} from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class EspecieRepository {

  constructor(private _databaseService: DatabaseService) {
  }
  async findAll(): Promise<Especie[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbEspecie: DBSQLiteValues = await db.query("select * from tb_especie");
      return tbEspecie.values.map(especie=>objectKeysToCamelCaseV2(especie));
    });
  }

  async findById(id: number): Promise<Especie> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "select * from tb_especie where id = ? limit 1";
      let values: Array<any> = [id];
      let ret: any = await db.query(sqlcmd, values);
      if (ret.values.length > 0) {
        return objectKeysToCamelCaseV2(ret.values[0] as Especie);
      }
      throw Error('get tb_especie by id failed');
    });
  }
}
