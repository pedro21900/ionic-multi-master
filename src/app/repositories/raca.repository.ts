import {Injectable} from '@angular/core';
import { DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {DatabaseService} from '../services/database.service';
import {Raca} from '../domain/raca';
import {objectKeysToCamelCaseV2} from 'keys-converter';
import {Equino} from '../domain/equino';

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

  async findById(id: number): Promise<Raca> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "select * from tb_raca where id = ? limit 1";
      let values: Array<any> = [id];
      let ret: any = await db.query(sqlcmd, values);
      if (ret.values.length > 0) {
        return objectKeysToCamelCaseV2(ret.values[0] as Raca);
      }
      throw Error('get equino by id failed');
    });
  }




}
