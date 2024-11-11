const express = require("express");
const { getNotes, createNote, getNotesPage, deleteNote, editNote, showEditForm } = require("../controllers/notesController");
const router = express.Router();
const isAuthenticated = require("./../middleware/isAuthenticated");

router.get("/", isAuthenticated, getNotes);
router.post("/", isAuthenticated, createNote);
router.get("/create", isAuthenticated, getNotesPage);
router.delete("/:id", isAuthenticated, deleteNote);
router.post("/edit/:id", isAuthenticated, editNote);
router.get("/edit/:id", isAuthenticated, showEditForm);
module.exports = router;