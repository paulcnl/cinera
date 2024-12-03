import programRepository from "./programRepository";
import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const programs = await programRepository.readAll();
  res.json(programs);
};

export default { browse };