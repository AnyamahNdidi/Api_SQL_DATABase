import { addpost, getAllPost,getSingleUserPost,addUserPostComment} from "../services/post.service.mjs"


export const addUserPost = (req, res) => {
    const { decs, imagePath, } = req.body;
    const {id} =req.params
    const data = {
        describtion: decs,
        imagePath: imagePath,
    }
    addpost(data, id, (error, result) => {

        if (error)
        {
            console.log(error.message)
            res.status(404).json({
                sucesss: 0,
                message:error.message,
            })
        }

        return res.status(200).json({
            sucesss: 1,
            data: result
        })

        
    })
}

export const  getAllUserPost = (req, res) => {

    const data = {}
    getAllPost(data, (error, result) => {
        if (error) {
       
        return res.status(400).send({ success: 0, data: "Bad request" });
        };

        return res.status(200).json({
            success: 1,
            data: result
        })
      
    })
}

export const getSingleUserPosts = (req, res) => {
    const { id } = req.params
    console.log(id)
    getSingleUserPost(id, (error, result) => {

           if (error) {
       
        return res.status(400).send({ success: 0, data: error });
        };

        return res.status(200).json({
            success: 1,
            data: result
        })
        
    })
    
}


export const postComment = (req, res) => {
    const {userid} = req.params
    const { postid } = req.params
    
    const {comment} = req.body
    const data = {
        comment: comment
    }
    addUserPostComment(data, userid, postid, (error, result) => {
        
           if (error) {
       
        return res.status(400).send({ success: 0, data: error });
        };

        return res.status(200).json({
            success: 1,
            data: result
        })
    })
    
 }