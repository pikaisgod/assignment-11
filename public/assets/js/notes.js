const noteList = document.getElementById('saved-notes'); 
const noteTitle = document.getElementById('note-title'); 
const noteText = document.getElementById('note-text'); 
const saveNoteBtn = document.getElementById('save-note-btn'); 
const clearFormBtn = document.getElementById('clear-form-btn'); 

// Fetch and display notes from the server
const getNotes = async () => {
  try {
    const response = await fetch('/api/notes'); 
    const notes = await response.json(); 

    displayNotes(notes); 
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

// Display the notes in the list
const displayNotes = (notes) => {
  noteList.innerHTML = ''

  notes.forEach(note => {
    // Create a list item for each note
    const li = document.createElement('li');
    li.textContent = note.title; 
    li.setAttribute('data-id', note.id); 

    // Optionally, add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id)); 

    li.appendChild(deleteBtn); 
    noteList.appendChild(li); 
  });
};

// Save a new note
const saveNote = async (note) => {
  try {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(note), 
    });

    if (response.ok) {
      getNotes(); 
      clearForm(); 
    } else {
      alert('Failed to save the note');
    }
  } catch (error) {
    console.error('Error saving note:', error);
  }
};

// Delete a note by its ID
const deleteNote = async (id) => {
  try {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' }); 
    getNotes(); 
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

// Clear the form fields
const clearForm = () => {
  noteTitle.value = '';
  noteText.value = '';
};

// Event listener for the "Save Note" button
saveNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim(); 
  const text = noteText.value.trim(); 

  if (title && text) {
    const newNote = { title, text }; 
    saveNote(newNote); 
  } else {
    alert('Please enter a title and text for the note');
  }
});

// Event listener for the "Clear Form" button
clearFormBtn.addEventListener('click', clearForm);

// Fetch and display notes when the page loads
getNotes();
