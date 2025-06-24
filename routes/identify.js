import express from "express";
import { getAllContact, identifyContact } from "../controllers/contactController.js";

// Create a router for the identify route
// This router will handle POST requests to identify a contact and GET requests to retrieve all contacts
const router = express.Router();
router.post("/", identifyContact);
router.get("/all", getAllContact);

export default router;
