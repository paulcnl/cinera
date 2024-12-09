import type { RequestHandler } from "express";

// Import access to data
import itemRepository from "./itemRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const items = await itemRepository.readAll();

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const itemId = Number(req.params.id);
    const item = await itemRepository.read(itemId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newItem = {
      title: req.body.title,
      user_id: req.body.user_id,
    };

    // Create the item
    const insertId = await itemRepository.create(newItem);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Fetch the ID of the item to update
    const itemId = Number(req.params.id);

    // Extract the updated item data from the request body
    const updatedItem = {
      title: req.body.title,
      user_id: req.body.user_id,
    };

    // Update the item
    const updatedItemId = await itemRepository.update(itemId, updatedItem);

    // Respond with HTTP 200 (OK) and the ID of the updated item
    res.json({ updatedItemId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Delete operation
const remove: RequestHandler = async (req, res, next) => {
  try {
    // Fetch the ID of the item to delete
    const itemId = Number(req.params.id);

    // Delete the item
    await itemRepository.delete(itemId);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, edit, remove };
