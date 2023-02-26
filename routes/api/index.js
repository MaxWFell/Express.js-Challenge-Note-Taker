const express = require('express');
const serverRouter = express.Router();
const fs = require('fs').promises;
const directoryPath = require('path');
const uuid = require(directoryPath.join(__dirname, "../../helpers/uuid"));

const NOTES_PATH = directoryPath.join(__dirname, '../..', 'db', 'db.json');

// Get all notes
serverRouter.get('/notes', async (req, res) => {
  try {
    const notes = await getNotes();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a new note
serverRouter.post('/notes', async (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ msg: 'Please enter both title and text' });
  }

  try {
    const notes = await getNotes();
    const newNote = { id: uuid(), title, text };
    notes.push(newNote);
    await saveNotes(notes);
    res.redirect('back');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a note
serverRouter.delete('/notes/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const notes = await getNotes();
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    notes.splice(index, 1);
    await saveNotes(notes);
    res.redirect('back');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Utility function to read notes from file
async function getNotes() {
  const data = await fs.readFile(NOTES_PATH);
  return JSON.parse(data);
}

// Utility function to save notes to file
async function saveNotes(notes) {
  const data = JSON.stringify(notes);
  await fs.writeFile(NOTES_PATH, data);
}

module.exports = serverRouter;
