import {db} from "../config/db.config.mjs"

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