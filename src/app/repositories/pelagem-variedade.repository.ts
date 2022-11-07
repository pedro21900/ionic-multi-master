import {Injectable} from '@angular/core';
import {DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {DatabaseService} from '../services/database.service';
import {PelagemVariedade} from '../domain/pelagem-variedade';
import {objectKeysToCamelCaseV2} from 'keys-converter';



@Injectable({
  providedIn: 'root'
})
export class PelagemVariedadeRepository {

  constructor(private _databaseService: DatabaseService) {
  }

  async findAll(): Promise<PelagemVariedade[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbPelagemVariedade: DBSQLiteValues = await db.query("select * from tb_pelagem_variedade");
      return tbPelagemVariedade.values.map(pelagemVariedade=>objectKeysToCamelCaseV2(pelagemVariedade));
    });
  }



}
