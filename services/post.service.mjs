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