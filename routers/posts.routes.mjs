import express from "express";

const router = express.Router()
import {addUserPost, getAllUserPost,getSingleUserPosts} from "../controller/posts.controller.mjs"

router.post("/addpost/:id", addUserPost)
router.get("/all/post", getAllUserPost)
router.get("/single/post/:id", getSingleUserPosts)
export default router