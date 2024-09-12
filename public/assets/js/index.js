const saveNote = (note) => {
    return fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
  };
  
  const deleteNote = (id) => {
    return fetch(`/api/notes/${id}`, { method: 'DELETE' });
  };
  
  // Fetch and display notes in the left-hand column
  const getNotes = () => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => {
        // Code to display notes
      });
  };
  
  // Handle Save Note, Delete Note, and other interactions
  