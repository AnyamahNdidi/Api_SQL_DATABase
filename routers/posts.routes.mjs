import express from "express";

const router = express.Router()
import {addUserPost} from "../controller/posts.controller.mjs"

router.post("/addpost/:id", addUserPost)
export default router