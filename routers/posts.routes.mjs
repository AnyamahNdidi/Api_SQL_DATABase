import express from "express";

const router = express.Router()
import {addUserPost, getAllUserPost,getSingleUserPosts, postComment,getPostAllComment, userLike, userDislike, postDelete} from "../controller/posts.controller.mjs"

router.post("/addpost/:id", addUserPost)
router.get("/all/post", getAllUserPost)
router.get("/single/post/:id", getSingleUserPosts)
router.post("/post-comments/:userid/:postid", postComment)
router.get("/all/post-comments/:postid", getPostAllComment)
router.put("/like/:postid", userLike )
router.put("/dislike/:postid", userDislike )
router.delete("/delete/:postid", postDelete )
export default router