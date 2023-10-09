const notesModel = require('../model/notes');

 const  createNote = async function (req, res) {
    try{
   const { title, description } = req.body;
    const userId = req.decode

    if ( !title || !description) return res.status(400).json({ status: false, message: 'Please provide all required fields' });
    
    const data={
        title,
        description,
        userId
    }

    const newNote = await notesModel.create(data);

    res.status(201).send({
      status: true,
      message: 'Note created successfully',
      note: newNote,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getNotes = async function (req, res) {
    try {
      const userId = req.decode; 

      const userNotes = await notesModel.find({ userId });
  
      res.status(200).json({ status: true, notes: userNotes });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  };
  
  const updateNote = async function (req, res) {
    try {
      const noteId = req.params.noteId;
      const { title, description } = req.body;

      if(!title || !description) return res.status(400).send({status: false, message: 'Please provide  fields for updating notes'})
      
      const existingNote = await notesModel.findById(noteId);
      if (!existingNote) {
        return res.status(404).json({ status: false, message: 'Note not found' });
      }
      if(req.decode != existingNote.userId) return res.status(401).send({status: false, message: 'Unauthorized access'})
     
      
      const updateNote = await notesModel.findByIdAndUpdate(noteId, { title, description }, { new: true });
      
  
      res.status(200).json({ status: true, message: 'Note updated successfully', note: updateNote });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  };

  const deleteNote = async function (req, res) {
    try {
      const noteId = req.params.noteId;
      
      const existingNote = await notesModel.findById(noteId);
      if (!existingNote) {
        return res.status(404).json({ status: false, message: 'Note not found' });
      }
      if(req.decode != existingNote.userId) return res.status(401).send({status: false, message: 'Unauthorized access'})

      await notesModel.findByIdAndDelete(noteId);
  
      res.status(200).json({ status: true, message: 'Note deleted successfully' });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  };
  
  
  
  
  


module.exports = {createNote,getNotes,updateNote,deleteNote}