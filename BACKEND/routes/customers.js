const customerRouter = require("express").Router();
let Customer = require("../models/Customer");
//let Suplier = require("../models/Suplier");
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');
//const NewOrders = require('../models/SupplierNewOrders');



const signToken = userID => {
    return JWT.sign({
        iss : "damru",
        sub : userID
//token expires in 1hour, after 1h user have to relogin 
    },"damru",{expiresIn: "1h"});
}

customerRouter.route('/register').post((req,res)=>{

    const {first_name,last_name,email,address,phone,username,password,role} = req.body;

    //check username
    Customer.findOne({ username},(err,user)=>{
        if(err)
        res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
       if(user)
       res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
       else{
           const newCustomer = new Customer({first_name,last_name,email,address,phone,username,password,role});
           newCustomer.save(err=>{
               if(err)
               res.status(500).json({message : {msgBody : "Error has occured ", msgError: true}});
               else
               res.status(201).json({message : {msgBody : "Account Successfully created", msgError: false}});

           });
       }  

    });
});   
//use passport locatstrategy for login
customerRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
        //get request user from passport compare password
       const {_id,username,role} = req.user;
       //create json token
       const token =signToken(_id);
       //set cookie
       //use http only for prevent client edit cookie using java scripts
       //same site use for cross site scripting prevention
       res.cookie('access_token',token,{httpOnly: true, sameSite:true});
       res.status(200).json({isAuthenticated : true,user : {username,role}});
    }
    
});

customerRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
   res.clearCookie('access_token');
   res.json({user:{username : "", role : ""},success : true});    
});

//user Profile
customerRouter.get('/customerprofile',passport.authenticate('jwt',{session : false}),(req,res)=>{

   // let userID = req.params.id;
   // const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;

        Customer.findById({_id : req.user._id}).then(customer=>{
        
        if(!customer){
            error.nonprofile = 'There is no profile for this user';
            return res.status(404).json(errors);

        }if(customer){
        res.json(customer);
        }
    })
    .catch(err => res.status(404).json(err));  
 });

//  supplierRouter.route('/supplierprofile/:id').get((req,res)=>{

//     let userID = req.params.id;
//     //const {name,nicno,address,contactno,companyname,raw,description,email,username,password,role} = req.body;
 
//          Supplier.findById(userID).then(supplier=>{
         
//          if(!supplier){
//              error.nonprofile = 'There is no profile for this user';
//              return res.status(404).json(errors);
 
//          }if(supplier){
//          res.json(supplier);
//          }
//      })
//      .catch(err => res.status(404).json(err));  
//  })


//all customers
customerRouter.route("/allcustomer").get((req,res)=>{

    Customer.find().then((customer)=>{
        res.json(customer)
    }).catch((err)=>{
        console.log(err);
    })

})

//new orders
/*customerRouter.route("/neworders").get((req,res)=>{

    NewOrders.find().then((neworders)=>{
        res.json(neworders)
    }).catch((err)=>{
        console.log(err);
    })

})*/

customerRouter.route("/customerupdate/:id").put(async(req,res)=>{
    let userID = req.params.id;
    //const supplier = await Supplier.findById(req.user._id);
    //destructor
    const{first_name,last_name,email,address,phone,username,password} = req.body;

    const updateCustomer = {
        first_name,
        last_name,
        email,
        address,
        phone,
        username,
        password
    }
    try{
        await Customer.findByIdAndUpdate(userID,updateCustomer).exec();
        res.status(200).send({status:"Customer updated"})
    }
    catch(err){
        res.status(500).send({status:"Error with updating data", error: err.message});
    }
    
})


customerRouter.route("/customerdelete/:id").delete(async(req,res)=>{
    let id = req.params.id;


    try {
        await Customer.findByIdAndRemove(id).exec();
        res.send('Succesfully Deleted')
  
      } catch (error) {
          console.log(error);
          
      }
});

customerRouter.get('/admin',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
    res.status(403).json({message : {msgBody : "You're not an admin", msgError : true}});
    
});

customerRouter.get('/customerauthenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});  
});
/*router.route("/add").post((req,res)=>{

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const address = req.body.address;
    const phone = Number(req.body.phone);
    const username = req.body.username;
    const password = req.body.password;

    const newCustomer = new Customer({

        first_name,
        last_name,
        email,
        address,
        phone,
        username,
        password
    })

    newCustomer.save().then(()=>{
        res.json("Customer Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/all").get((req,res)=>{

    Customer.find().then((customers)=>{
        res.json(customers)

    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id; 
    const {first_name, last_name, email, address, phone,username, password} = req.body;

    const updateCustomer = {
        first_name,
        last_name,
        email,
        address,
        phone,
        username,
        password

    }
    const update = await Customer.findByIdAndUpdate(userId, updateCustomer).then(()=>{
        res.status(200).send({status: "user updated"})  
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })

})
router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Customer.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete"});
    })
})
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
   const user =  await Customer.findById(userId).then((customer)=>{
        res.status(200).send({status:"USer fetched", customer});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with user", error : err.message});
    })
})*/

module.exports = customerRouter;