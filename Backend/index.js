const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 5000

//mongodb connection

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connect to Database"))
.catch((err) => console.log(err))


//  user Schema

const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        unique : true,
    },
    password : String,
    confirmPassword : String,
    image : String
})

const userModel = mongoose.model("user",userSchema)


//api
app.get("/",(req,res) => {
    res.send('Server is running')
})

// sign up
app.post('/signup', async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res.status(400).send({ message: "Email id is already registered" , alert:false});
      } else {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Successfully signed up", alert:true});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
});
  

// api login
app.post('/login',async(req,res) => {
    console.log(req.body)
    const {email} = req.body

    try {
        const user = await userModel.findOne({email : email})
        if(user)
        {
            const dataSend = {
                _id: user._id,
                firstName: user.firstName,  
                lastName: user.lastName,
                email: user.email,        
                image: user.image,
            }
            console.log(dataSend)
            res.send({message : "Login is Successfully", alert :true, data:dataSend})
        }
        else{
            res.send({message:"Email is not available, please sign up", alert:false})
        }
    }catch(error)
    {
       console.error(error);
       res.status(500).send({message: "Internal server error"})
    }
})



// new product Schema

const  productSchema = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String
});

const productModel = mongoose.model("product",productSchema)

app.post("/uploadProduct",async(req,res) => {
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "upload Successfully"})
})

  
// view the data

app.get("/product", async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

app.listen(PORT,() => console.log("server is running at port : ", +PORT))