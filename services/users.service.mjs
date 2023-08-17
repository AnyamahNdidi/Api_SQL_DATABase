import {db}  from "../config/db.config.mjs"

export const register = (data, callback ) => {
    db.query(
        "INSERT INTO users (first_name, last_name, email, user_password) value (?, ?, ?,?)",
        [data.first_name, data.last_name, data.email, data.user_password],
        (error, result, fields) => {
            if (error)
            {
              return callback(error);  
            }
            return(callback(null, "registration successfully"));
        }
    )
}