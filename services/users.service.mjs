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
              // Return the inserted data without the password
            const insertedData = { ...data };
            delete insertedData.user_password;
            return(callback(null, insertedData));
        }
    )
}

export const updateuser = (data, id, callback) => {
    db.query(
        "UPDATE users SET first_name = COALESCE(?, first_name), last_name =COALESCE(?, last_name), email=COALESCE(?, email)   where id = ?",
        [data.first_name, data.last_name, data.email,  id],
        (error, result, fields) => {
            if (error)
            {
               return callback(error); 
            } 
            
            return (callback(null, "update sucessfully"))

        }

    )
}


export const loginUser = (data, callback) => {
    db.query(
        "SELECT id FROM users WHERE email = ? AND user_password = ?",
        [data.email, data.user_password],
        (error, results, fields) => {
            if (error)
            {
               return callback(error);
            } 

            if (results.length > 0)
            {
                return callback(null, "login sucess")
            } else
            {
                return callback(null, "invalid credentials")
            }
        }

    )
}