import React,{useState} from "react";
import axios from "axios";
import './Addcustomer.css';


export default function Addcustomer(){
    const [first_name, Setfirst_name] = useState("");
    const [last_name, Setlast_name] = useState("");
    const [email, Setemail] = useState("");
    const [address, Setaddress] = useState("");
    const [phone, Setphone] = useState("");
    const [username, Setusername] = useState("");
    const [password, Setpassword] = useState("");

    function sendData(e){
     /* swal({
        title: "Success!",
        text: "Supplier Successfully registered",
        icon: "success",
        button: "Ok",
      });*/
        e.preventDefault()

        const newCustomer = {
            first_name,
            last_name,
            email,
            address,
            phone,
            username,
            password
        }
        
        axios.post("http://localhost:8080/customer/register",newCustomer).then(()=>{
            alert("User added")
        }).catch((err)=>{
            alert(err)

        })
    }



    return(
        <div className="container">
          <h1><center> Customer Registration</center></h1>
          <br></br>
          <br></br>
        <form onSubmit={sendData}>
  <div className="mb-3">
    <label for="first_name" className="form-label">First Name</label>
    <input type="string" className="form-control" id="first_name" onChange={(e)=>{
        Setfirst_name(e.target.value)
    }}/>
    
  </div>

  <div className="mb-3">
    <label for="last_name" className="form-label">Last Name</label>
    <input type="string" className="form-control" id="last_name" onChange={(e)=>{
        Setlast_name(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="string" className="form-control" id="email" onChange={(e)=>{
        Setemail(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="address" className="form-label">Address</label>
    <input type="string" className="form-control" id="address" onChange={(e)=>{
        Setaddress(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="phone" className="form-label">Phone No</label>
    <input type="string" className="form-control" id="phone" onChange={(e)=>{
        Setphone(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="username" className="form-label">username</label>
    <input type="string" className="form-control" id="username" onChange={(e)=>{
        Setusername(e.target.value)
    }} />
    
  </div>

  <div className="mb-3">
    <label for="password" className="form-label">password</label>
    <input type="string" className="form-control" id="password" onChange={(e)=>{
        Setpassword(e.target.value)
    }} />
    
  </div>
 
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    )
}