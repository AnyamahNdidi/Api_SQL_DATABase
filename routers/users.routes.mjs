import express from "express"

import { registerUser } from "../controller/users.controller.mjs"

const router = express.Router()

router.post("/register", registerUser)

export default router