import { addpost } from "../services/post.service.mjs"


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