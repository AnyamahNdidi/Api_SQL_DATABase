import { register,updateuser } from "../services/users.service.mjs"

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
                message:error.message,
            })
            
        }

        return res.status(201).json({
            sucesss: 1,
            data:result
        })
    } )
}

export const updateUser = (req, res) => {
    const { firstName, lastName,email } = req.body
    
     const data =  {
        first_name: firstName,
        last_name: lastName,
        email:email
      
    }
    const { id } = req.params
    console.log("this is id", id)

    updateuser(data, id, (error, result) => {
        if (error)
        {
             console.log(error.message)
            res.status(404).json({
                sucesss: 0,
                message:error.message,
            })
        }

         return res.status(201).json({
            sucesss: 1,
            data:result
        })
        
    })
}
