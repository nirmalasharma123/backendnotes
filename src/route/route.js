const express = require ('express');
const router = express.Router();  
const { userSignUP, userLogin}  = require("../controller/userController");
const {createNote,getNotes,updateNote,deleteNote} = require("../controller/notes");
const {authentication} = require ("../midlleware/auth");

router.post('/signUP',userSignUP);
router.post('/login',userLogin);
router.post('/createNote',authentication,createNote);
router.get('/getNotes',authentication,getNotes);
router.put('/updateNotes/:noteId',authentication,updateNote);
router.delete('/deleteNote/:noteId',authentication,deleteNote);





module.exports= router;
