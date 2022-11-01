import {Injectable} from '@angular/core';
import {CapacitorSQLite} from '@capacitor-community/sqlite';
import {SQLiteService} from '../services/sql-lite.service';
import {PassaporteEquestre} from '../domain/passaporte-equestre';



@Injectable({
  providedIn: 'root'
})
export class EquinoProvider {



  constructor(private _sqlite:SQLiteService) {
  }



  delete(id: number) {
    const statement = `DELETE
                       FROM tb_equino
                       WHERE id = ${id};`;
    return CapacitorSQLite.query({statement, values: [],database:"siapec3-pe"});
  }

  async insert(tb_equino: { id: number, nome: string }) {
    const db = await this._sqlite.retrieveConnection("siapec3-pe");
    db.open();
    return await db.query(`INSERT INTO tb_equino (id, nome)
                       VALUES (${tb_equino.id}, '${tb_equino.nome}');`);

  }

  async findAll(){
    const db = await this._sqlite.dbConection("siapec3-pe");
    db.open();
    const object= await db.query('SELECT * FROM tb_equino;');
    return object.values
  }

  findById(id: number) {
    const statement = `SELECT * FROM tb_equino WHERE id=${id} ;`;
    return CapacitorSQLite.execute({statements: statement});
  }



}
