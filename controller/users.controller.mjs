import { register,updateuser, loginUser } from "../services/users.service.mjs"

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

export const regUser = (req,res) => {
    
    const  {email, password} = req.body
    const data = {
        email: email,
        user_password:password
    }
    loginUser(data, (error, results) => {
        if (error)
        { 
            console.log(error.message)
          return  res.status(404).json({
                sucesss: 0,
                message:error.message,
            })
        }

        return res.status(200).json({
            sucesss: 1,
        data:results
        })
    })
}
