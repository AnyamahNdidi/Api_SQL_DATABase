import express from "express"

const app = express()
const port = 5090

app.listen(port, () => {
    console.log("i'm ready to listen")
})
