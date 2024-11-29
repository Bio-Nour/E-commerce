const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");     /////////////(BUdTpQfj5HKt9voI))
const path = require('path');
const multer = require('multer'); ///provide to upload images
const cors = require('cors'); //provide to access react project
const { error } = require('console');
const { type } = require('os');
const { features } = require('process');

app.use(express.json());
app.use(cors());  //access react project fronend to backend
app.use(express.static(__dirname + 'public'))

//database connection
mongoose.connect("mongodb+srv://devNour:BUdTpQfj5HKt9voI@cluster0.qscmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


////Api creation and
app.get("/", (req, res) => {
  res.send("Hello World");
})

//Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})
const upload = multer({ storage: storage })

//endpoint to upload images

app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`

  })

})


//creating product schema
const productSchema = mongoose.model('Product', {
  id: {
    type: Number,
    required: true,

  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  }
})

//1- create api endpoint to add new product

app.post('/addproduct', async (req, res) => {
  let products = await productSchema.find({})
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1)
    let last_product = last_product_array[0]
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new productSchema({
    id: id,
    name: req.body.name,
    image: req.body.image,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    category: req.body.category,
  })
  console.log(product);
  await product.save();
  res.json({
    success: true,
    name: req.body.name,
  })

});

//2-create Api for  deleting product
app.post('/removeproduct', async (req, res) => {
  await productSchema.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  })
})
//creaing api for display all products

app.get('/allproducts', async (req, res) => {
  let products = await productSchema.find({});
  console.log("All products fetched");
  res.send(products);

})

//Schema creating for user model
const Users = mongoose.model('Users', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,

  },
  date: {
    type: Date,
    default: Date.now
  }
})



//create endpoint to rigestring user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: " existing user found with same email address" })
  }
  //if it's not found creat cart
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  //using user with in cart
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart

  })
  //save user
  await user.save();
  //creat token
  const data = {
    user: {
      id: user.id
    }
  }
  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token })
})

//create endpoint to  user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        }
      }

      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, errors: "Wrong password" });
    }

  } else {
    res.status(404).json({ success: false, errors: "Wrong email Id" });
  }


});


//create endpoint for new collection data
app.get("/newcollections", async (req, res) => {
  let products = await productSchema.find({});//store product by make array of products
  let newCollections = products.slice(1).slice(-8) //add 8 product

  console.log("New collections fetched");
  res.send(newCollections);  //send new collection as aresponse


})

//create endpoint for popular in women section

app.get("/popularinwomen", async (req, res) => {
  let products = await productSchema.find({ category: "women" });//store product for women by make array of products using category
  let popular_in_women = products.slice(1, 4);
  console.log("Popular women fetched");
  res.send(popular_in_women);

})

//creating middleware to fetch user


const fetchUser = async(req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
     res.status(403).send({errors: 'Unauthorized' });
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom'); //we decoded the secret token
      req.user = data.user;  //found Id
      next();

    } catch (error) {
      res.status(401).send({ errors: 'Token is not valid' });

    }

  }
};

// create endpoint for adding products  in cartdata

app.post("/addtocart", fetchUser, async (req, res) => {
  console.log(req.body ,req.user);
  let userData = await Users.findOne({_id: req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id: req.user.id}, {cartData:userData.cartData}); //save data in mongodb and update cartdata
  res.send("Added")
})
// create endpoint for remove products  from cartdata

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed," ,req.body, req.user);
  let userData = await Users.findOne({_id: req.user.id});
  if(userData.cartData[req.body.itemId] > 0){
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData:userData.cartData}); //save data in mongodb and update cartdata
    res.send("Removed")
  }else{
    res.send("Not enough product in cart")
  }
})
//create endpoint to get cartdata 

app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({_id: req.user.id});
  console.log("Cart fetched",userData.cartData);
  res.send(userData.cartData)
})


app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(`Error: ${error}`);

  }

});

