import {Injectable} from '@angular/core';
import { DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {DatabaseService} from '../services/database.service';
import {Raca} from '../domain/raca';
import {objectKeysToCamelCaseV2} from 'keys-converter';

@Injectable({
  providedIn: 'root'
})
export class RacaRepository {

  constructor(private _databaseService: DatabaseService) {
  }

  async findAll(): Promise<Raca[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbRaca: DBSQLiteValues = await db.query("select * from tb_raca");
      return tbRaca.values.map(raca=>objectKeysToCamelCaseV2(raca));
    });
  }






}
