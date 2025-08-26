const express  = require("express");

const {auth} = require("../middleware/auth.middleware")
const {NoteModel} = require("../model/note.model")

const noteRouter = express.Router()

noteRouter.use(auth)

noteRouter.post("/create", async(req,res)=>{
    // logic here
    //res.send("WIP")
    try {
        const notes = new NoteModel(req.body)
        await notes.save()
        res.status(200).json({msg:"A new note has been created...!"})

    } catch (err) {
        res.status(400).json({error:err})
        
    }
})

// noteRouter.get("/",async(req,res)=>{
//     // logic here
//     try {
//          const notes = await NoteModel.find({ userID: req.body.userID })
//          res.status(200).json({notes})
//     } catch (err) {
//         res.status(400).json({error:err})
//     }

// })

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.userID });  // use req.userID from middleware
    res.status(200).json({ notes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
noteRouter.patch('/update/:noteID', async(req,res)=>{
    // logic here
    const{noteID} = req.params // destructure the 
    const note = await NoteModel.findOne({_id:noteID}) //note find by id
    try {
      if(note.userID===req.body.userID){
        await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
        res.status(200).json({msg:`The note with ID:${noteID} has been updated`})
      }else{
        res.status(200).json({msg:"you are Not Authorised"})
      }
    } catch (err) {
      re.status(200).json({error:err})
    }

})

noteRouter.delete('/delete/:noteID', async(req,res)=>{
    // logic here
    const{noteID} = req.params // destructure the 
    const note = await NoteModel.findOne({_id:noteID}) //note find by id
    try {
      if(note.userID===req.body.userID){
        await NoteModel.findByIdAnddelete({_id:noteID})
        res.status(200).json({msg:`The note with ID:${noteID} has been Deleted`})
      }else{
        res.status(200).json({msg:"you are Not Authorised"})
      }
    } catch (err) {
      res.status(200).json({error:err})
    }

})

module.exports = {
    noteRouter
}