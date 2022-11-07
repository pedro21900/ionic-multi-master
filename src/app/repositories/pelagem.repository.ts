import {Injectable} from '@angular/core';
import { DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {objectKeysToCamelCaseV2, objectKeysToSnakeCaseV2} from 'keys-converter';
import {DatabaseService} from '../services/database.service';
import {Pelagem} from '../domain/pelagem';

@Injectable({
  providedIn: 'root'
})
export class PelagemRepository {

  constructor(private _databaseService: DatabaseService) {
  }

  async findAll(): Promise<Pelagem[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbPelagem: DBSQLiteValues = await db.query("select * from tb_pelagem");
      return tbPelagem.values.map(pelagem=>objectKeysToCamelCaseV2(pelagem));
    });
  }



}
