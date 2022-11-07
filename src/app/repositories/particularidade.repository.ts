import {Injectable} from '@angular/core';
import {CapacitorSQLite, DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {objectKeysToCamelCaseV2, objectKeysToSnakeCaseV2} from 'keys-converter';
import {DatabaseService} from '../services/database.service';
import {Particularidade} from '../domain/particularidade';

@Injectable({
  providedIn: 'root'
})
export class ParticularidadeRepository {

  constructor(private _databaseService: DatabaseService) {
  }

  async findAll(): Promise<Particularidade[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbParticularidade: DBSQLiteValues = await db.query("select * from tb_particularidade");
      return tbParticularidade.values.map(particularidade=>objectKeysToCamelCaseV2(particularidade));
    });
  }
}
