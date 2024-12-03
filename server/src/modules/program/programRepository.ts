import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class ProgramRepository {
  async readAll(): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM program");
    return rows;
  }
}

export default new ProgramRepository();