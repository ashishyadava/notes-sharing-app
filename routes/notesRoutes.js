const express = require("express");
const { getNotes, createNote, getNotesPage, deleteNote } = require("../controllers/notesController");
const router = express.Router();
const isAuthenticated = require("./../middleware/isAuthenticated");

router.get("/", isAuthenticated, getNotes);
router.post("/", isAuthenticated, createNote);
router.get("/create", isAuthenticated, getNotesPage);
router.delete("/:id", isAuthenticated, deleteNote);

module.exports = router;