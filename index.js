import express from "express"
import router from "./routers/users.routes.mjs"
const app = express()
const port = 5090

app.use(express.json())

app.use("/users", router)

app.listen(port, () => {
    console.log("i'm ready to listen")
})
