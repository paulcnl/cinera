import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Program {
  id: number;
  title: string;
  category_id: number;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

class ProgramRepository {
  async readAll(): Promise<Program[]> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM program");
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      category_id: row.category_id,
      synopsis: row.synopsis,
      poster: row.poster,
      country: row.country,
      year: row.year,
    }));
  }

  async read(id: number): Promise<Program | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM program WHERE id = ?",
      [id],
    );
    if (rows.length === 0) {
      return null;
    }
    return {
      id: rows[0].id,
      title: rows[0].title,
      category_id: rows[0].category_id,
      synopsis: rows[0].synopsis,
      poster: rows[0].poster,
      country: rows[0].country,
      year: rows[0].year,
    };
  }

  async create(program: Program): Promise<Program> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO program SET ?",
      [program],
    );
    return { ...program, id: result.insertId };
  }

  async update(id: number, program: Partial<Program>): Promise<Program> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE program SET ? WHERE id = ?",
      [program, id],
    );
    return {
      id,
      title: program.title ?? "",
      category_id: program.category_id ?? 0,
      synopsis: program.synopsis ?? "",
      poster: program.poster ?? "",
      country: program.country ?? "",
      year: program.year ?? 0,
    };
  }

  async delete(id: number): Promise<void> {
    await databaseClient.query("DELETE FROM program WHERE id = ?", [id]);
  }
}

export default new ProgramRepository();
