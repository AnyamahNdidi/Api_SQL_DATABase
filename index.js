import express from "express"
import router from "./routers/users.routes.mjs"
const app = express()
const port = 5090

app.use(express.json())

app.use("/users", router)
process.on("uncaughtException", (err) => {
    console.log(`server shutting down because of an uncaught exception`)
      console.log("uncaughtException: ", err);

     process.exit(1)
})
app.listen(port, () => {
    console.log("i'm ready to listen")
})
