const path = require('path');
const router = require('express').Router();

// GET /notes - Return notes.html
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET * - Return index.html for all other routes
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
