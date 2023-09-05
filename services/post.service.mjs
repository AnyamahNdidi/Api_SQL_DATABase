import {db} from "../config/db.config.mjs"

// return the post details and the user who add the post to the database
export const addpost = (data, id, callback) => {
    const query = `
    INSERT INTO posts (describtion, imagePath,datetimecreated,addedByUserId) VALUE (?,?,?,?)
    `
    const selectQuery = `
     SELECT p.*, u.first_name, u.last_name  FROM Posts P 
     INNER JOIN users u ON p.addedByUserId = u.id
     WHERE p.id = ?;
    `
    db.query(
        query,
        [data.describtion, data.imagePath, new Date(), id],
        (error, result, fields) => {
            if (error)
            {
                return callback(error)
            }
            const postId = result.insertId
            console.log("jhc", postId)
            db.query(
                selectQuery,
                [postId],
                (selectError, selectResult) => {
                    if (selectError)
                    {
                        return callback(selectError)
                    }
                    console.log(selectResult)
                    const insertedPost = selectResult[0]
                    let all = { ...insertedPost, user: id }
                    callback(null , all)
                }
            )
            // let dataReture = data
            // let all = { ...data, user: id }
            // console.log("result oo",result)
            // return callback(null, all)
        }
    )
}


export const getAllPost = (data, callback) => {

    const query = `
    SELECT p.id as postID, p.describtion, p.imagePath, p.likeCount, p.dislikeCount, u.email, u.first_name  FROM posts p inner join users u on p.addedByUserId = u.id
    `
    db.query(query, [],
        (error, result, fields) => {
            if (error)
            {
              return callback(error);
            }
            
            return callback(null, result)
        }
    )
    
}


export const getSingleUserPost = (id, callback) => {

    const query = `
      SELECT * FROM posts INNER JOIN users on posts.addedByUserId = users.id
      WHERE posts.addedByUserId = ?
    `

    db.query(query,
            [id],
        (error, result, fields) => {

        if (error)
            {
              return callback(error);
            }

            console.log("this is result",result.length)

      if (result.length === 0) {
            // If no user with the provided ID is found, return an error message
            return callback("No user found with this id ");
        }
            return callback(null, result)
        }
        
    )
    
}

export const addUserPostComment = (data, userId, Idpost, callback) => {
    const query = `
      INSERT INTO comments (postId, comment, dataTimeCreated, addedByUserid) value (?,?,?,?)
    `
    db.query(query,
        [Idpost, data.comment,  new Date(), userId],
        (error, result, fields) => {
            if (error)
            {
                callback(error)
            }

            let comData = data 
            let all = {...data, userId, Idpost }
            return callback(null, all)
        }
    )
}

export const getpostAndAllComment = ( postId, callback) => {

    // variable for holding post and user informatio(user information in object)

    const postWithUserAndComments = {
        post: null,
        user: null,
        comment:[]

    }

    const querypost = `
        select * from posts where id = ?
    `

    const queryuser = `
      SELECT  users.first_name, users.last_name from posts p INNER JOIN users on p.addedByUserId = users.id
       WHERE p.id = ?
    `

     const queryComment = `
        SELECT c.id,c.comment, c.dataTimeCreated, c.addedByUserId, u.first_name, u.last_name FROM comments c INNER JOIN users u on c.addedByUserid = u.id
        WHERE c.postid = ?
    `

    db.query(querypost, [postId], (error, result, fields) => {
        if (error)
        {
            return callback(error)
        }

        if (result.length === 0)
        {
            return callback("No posts found with this id")
        }

        console.log("this is result", result)
        postWithUserAndComments.post = result[0]

        db.query(queryuser, [postId], (error, result, fields) => {
              
        if (error)
        {
            return callback(error)
        }

        if (result.length === 0)
            {
            return callback("No posts found with this id")
            }

            postWithUserAndComments.user = result[0]
        
            db.query(queryComment, [postId], (error, result, fields) => {
                  if (error)
        {
            return callback(error)
                }
                
                postWithUserAndComments.comment = result
                return callback(null, postWithUserAndComments);
            })   
        })
       
    })

    
}

export const likePost = (postId, callback) => {
    const query = `
    UPDATE posts SET likeCount = likeCount + 1 WHERE id = ?
    `
    db.query(query, [postId], (error, result, fields) => {
        if (error)
        {
            return callback(error)
        }

        if (result.affectedRows  ===1)
        {
            return callback(null, "like sucessfully")
        } else
        {
         return callback( new Error("Invalid post")) 
        }
        
       
    })
}
export const dislikePost = (postId, callback) => {
    const query = `
    UPDATE posts SET dislikeCount = dislikeCount + 1 WHERE id = ?
    `
    db.query(query, [postId], (error, result, fields) => {
        if (error)
        {
            return callback(error)
        }

        if (result.affectedRows  ===1)
        {
            return callback(null, "Dislike sucessfully")
        } else
        {
         return callback( new Error("Invalid post")) 
        }
        
       
    })
}


export const deletePost = (postId, callback) => {
    const query = `
    DELETE FROM posts WHERE id = ? 
    `
    db.query(query, [postId],  (error, result, fields) => {
        if (error)
        {
            callback(error)
        } 
        
        if (result.affectedRows === 1)
        {
            callback(null, "deleted successfully")
            
        } else
        {
            return callback( new Error("Invalid post")) 
        }
    })
    
}