import {db} from "../config/db.config.mjs"

export const addpost = (data, id, callback) => {
    db.query(
        "INSERT INTO posts (describtion, imagePath,datetimecreated,addedByUserId) VALUE (?,?,?,?)",
        [data.describtion, data.imagePath, new Date(), id],
        (error, result, fields) => {
            if (error)
            {
                return callback(error)
            }
            let dataReture = data
            let all = { ...data, user: id }
            console.log("result oo",result)
            return callback(null, all)
        }
    )
}