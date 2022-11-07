import {Injectable} from '@angular/core';
import { DBSQLiteValues, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {objectKeysToCamelCaseV2, objectKeysToSnakeCaseV2} from 'keys-converter';
import {Equino} from '../domain/equino';
import {DatabaseService} from '../services/database.service';
import {ExploracaoPecuariaEquideo} from '../domain/exploracao-pecuaria-equideos';


@Injectable({
  providedIn: 'root'
})
export class EquinoRepository {



  constructor(private _databaseService: DatabaseService) {

  }

  async findAll(): Promise<Equino[]> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var tbEquino: DBSQLiteValues = await db.query("select * from tb_equino");
      return tbEquino.values.map(equino=>objectKeysToCamelCaseV2(equino));
    });
  }

  async insert(equino: Equino) {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      const keys:string[]=Object.keys(objectKeysToSnakeCaseV2(equino));
      const values:string[]=Object.values(equino);
      console.log(keys.map(x=>'?'));
      let sqlcmd: string = `insert into tb_equino (${keys.toString()}) values (${keys.map(x=>'?')})`;
      let ret: any = await db.run(sqlcmd, values);
      if (ret.changes.lastId > 0) {
        return objectKeysToCamelCaseV2(ret.changes as Equino);
      }
      throw Error('create equino failed');
    });
  }

  // async update(equino: Equino) {
  //   return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
  //     let sqlcmd: string = "update tb_equino set name = ?, description = ?, price = ?, imageUrl = ?, isAvailable = ?, isPopular = ?, category = ? where id = ?";
  //     let values: Array<any> = [equino.name, equino.description, equino.price, equino.imageUrl, equino.isAvailable, equino.isPopular, equino.category, equino.id];
  //     let ret: any = await db.run(sqlcmd, values);
  //     if (ret.changes.changes > 0) {
  //       return await this.getEquinoById(equino.id);
  //     }
  //     throw Error('update equino failed');
  //   });
  // }

  async findById(id: string): Promise<Equino> {
    return this._databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let sqlcmd: string = "select * from tb_equino where id = ? limit 1";
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
      await db.query(`delete from tb_equino where id = '${id}';`);
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

  // async findAllByPropriedadeId(id: number): Promise<Equino[]> {
  //   const db =  this._sqlite.dbConnection;
  //   const keys:string=Object.keys(objectKeysToSnakeCaseV2(new Equino)).toString();
  //   const object = await db.query(`SELECT * FROM tb_equino WHERE id_propriedade = ${id};`);
  //   const expPecEquideo: Equino[] = object.values.map(values => objectKeysToCamelCaseV2(values));
  //   return expPecEquideo;
  // }




}
