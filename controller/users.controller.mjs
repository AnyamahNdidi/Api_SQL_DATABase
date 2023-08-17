import { register } from "../services/users.service.mjs"

export const registerUser = (req, res, next) => {

    const {firstName, lastName, email, password } = req.body
    const data =  {
        first_name: firstName,
        last_name: lastName,
        email: email,
        user_password: password        
    }

    register(data, (error, result) => {
        
        if (error)
        {
            console.log(error.message)
            res.status(404).json({
                sucesss: 0,
                message:"bad request",
            })
            
        }

        return res.status(201).json({
            sucesss: 1,
            data:result
        })
    } )
}