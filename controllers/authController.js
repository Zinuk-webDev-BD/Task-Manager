const { isValidEmail } = require("../helpers/utils");
const authSchema = require("../models/authSchema");

const registration = async(req, res)=>{
    const {fullName, email, password} = req.body;
    try{
       if(!fullName?.trim()) return res.status(400).send({message:"Full Name iS Required"});
       if(!email) return res.status(400).send({message:"Email iS Required"});
       if(!isValidEmail(email)) return res.status(400).send({message:"Email is Invalid"});
       if(!password) return res.status(400).send({message:"Password iS Required"});
       
      //  checking if email is already registerd

       const existingEmail = await authSchema.findOne(email);
       if(existingEmail) return res.status(400).send({ message: "Email is already registerd"});


       const user = await authSchema({fullName, email, password})
       user.save()
      res.status(200).send({message: "Registration successfully cpmleted.Plz verify your email to login"})
    }
    catch(error) {
      console.log(error)
     res.status(500).send({message: " internal Server is error"})
    }
}
module.exports = { registration }
