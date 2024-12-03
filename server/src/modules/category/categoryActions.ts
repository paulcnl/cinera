// Some data to make the trick
// Import access to data
import categoryRepository from "./categoryRepository";

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();
  res.json(categoriesFromDB);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const category = categories.find((c) => c.id === parsedId);

  if (category) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

// Export it to import it somewhere else

export default { browse, read };
