import express from "express"

import { registerUser,updateUser } from "../controller/users.controller.mjs"

const router = express.Router()

router.post("/register", registerUser)
router.put("/update/:id", updateUser)

export default router