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

}
