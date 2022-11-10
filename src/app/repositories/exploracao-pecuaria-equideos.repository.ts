import {Injectable} from '@angular/core';
import { DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {objectKeysToCamelCaseV2, objectKeysToSnakeCaseV2} from 'keys-converter';
import {DatabaseService} from '../services/database.service';
import {ExploracaoPecuariaEquideo} from '../domain/exploracao-pecuaria-equideos';

@Injectable({
  providedIn: 'root'
})
export class ExploracaoPecuariaEquideoProvider {

  constructor(private _databaseService: DatabaseService) {
  }

  async findAll(): Promise<ExploracaoPecuariaEquideo[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbExploracaoPecuariaEquideos: DBSQLiteValues = await db.query("select * from vw_expr_pec_equideo");
      return tbExploracaoPecuariaEquideos.values
          .map(exploracaoPecuariaEquideos=>objectKeysToCamelCaseV2(exploracaoPecuariaEquideos));
    });
  }

  async findById(id: number): Promise<ExploracaoPecuariaEquideo> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "select * from vw_expr_pec_equideo where id = ? limit 1";
      let values: Array<any> = [id];
      let ret: any = await db.query(sqlcmd, values);
      if (ret.values.length > 0) {
        return objectKeysToCamelCaseV2(ret.values[0] as ExploracaoPecuariaEquideo);
      }
      throw Error('get exploracaoPecuariaEquideo by id failed');
    });
  }

}
