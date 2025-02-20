import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Define program-related routes
import categoryActions from "./modules/category/categoryActions";
import programActions from "./modules/item/programActions";

router.get("/api/programs/", programActions.browse);
router.get("/api/programs/:id", programActions.read);

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);
router.post("/api/programs", itemActions.add);
router.put("/api/programs/:id", itemActions.edit);
router.delete("/api/programs/:id", itemActions.remove);

router.get("/api/categories/", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);

/* ************************************************************************* */

// Declaration of a "Welcome" route

import sayActions from "./modules/item/sayActions";

router.get("/", sayActions.sayWelcome);

/* ************************************************************************* */

export default router;
