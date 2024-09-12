const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid'); 
const dbPath = path.join(__dirname, '../db/db.json');

// Helper function to read notes from db.json
const readNotes = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write notes to db.json
const writeNotes = (notes) => {
  fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
};

// GET /api/notes - Return all saved notes as JSON
router.get('/notes', (req, res) => {
  const notes = readNotes(); 
  res.json(notes); 
});

// POST /api/notes - Add a new note to db.json
router.post('/notes', (req, res) => {
  const notes = readNotes(); 
  const newNote = { id: uuidv4(), ...req.body }; 

  notes.push(newNote); 
  writeNotes(notes); 

  res.json(newNote); 
});

// DELETE /api/notes/:id - Delete a note by its ID
router.delete('/notes/:id', (req, res) => {
  const notes = readNotes(); 
  const updatedNotes = notes.filter(note => note.id !== req.params.id); 

  writeNotes(updatedNotes); 

  res.json({ message: 'Note deleted' }); 
});

module.exports = router;
