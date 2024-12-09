import type { Request, RequestHandler, Response } from "express";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req: Request, res: Response) => {
  const programs = await programRepository.readAll();
  res.json(programs);
};

const read: RequestHandler = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  const program = await programRepository.read(id);
  if (!program) {
    res.status(404).json({ error: "Program not found" });
  } else {
    res.json(program);
  }
};

const add: RequestHandler = async (req: Request, res: Response) => {
  const program = req.body;
  const newProgram = await programRepository.create(program);
  res.json(newProgram);
};

const edit: RequestHandler = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  const program = req.body;
  const updatedProgram = await programRepository.update(id, program);
  if (!updatedProgram) {
    res.status(404).json({ error: "Program not found" });
  } else {
    res.json(updatedProgram);
  }
};

const remove: RequestHandler = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  await programRepository.delete(id);
  res.json({ message: "Program deleted" });
};

export default { browse, read, add, edit, remove };