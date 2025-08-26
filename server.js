const express = require("express")
const {connection} =require("./db")
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require('./routes/note.routes')
const cors = require("cors")

const app = express()


app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/note",noteRouter)

const PORT = process.env.PORT || 8080;

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`The server is runnig on ${PORT}.`)

    } catch (err) {
        console.log(err)
        
    }
    
})

