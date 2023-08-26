import express from "express"

import { registerUser,updateUser,regUser } from "../controller/users.controller.mjs"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", regUser)
router.put("/update/:id", updateUser)

export default router