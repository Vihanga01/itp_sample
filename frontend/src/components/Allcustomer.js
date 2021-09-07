import React,{useState,useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Allcustomer.css';
 
import swal from 'sweetalert';

export default function Allcustomer(){

    const [customers, setCustomers] = useState([]);

    const deleteCustomer=(id) =>{
        axios.delete(`http://localhost:8080/customer/delete/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from Customer List",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("The file has been deleted!", 
                    "success",
                  );  setTimeout(function(){
                    window.location.reload();
                   },1000);
                } else {
                  swal("File Is Not Deleted");
                }
              });
        // ;
        })
      }

    useEffect(() =>{
        function getStudents(){
            axios.get("http://localhost:8080/customer/all").then((res) => {
                setCustomers(res.data);
            
            }).catch((err) => {
                alert(err.massage);
            })
        }
        getStudents();

    }, [])


    return (
        <>
        <Header/><div class="head">
   <h3> Customer Management</h3>
   
   </div>
   <div class="buttonn">
       <button type="button" class="btn btn-secondary btn-sm">GenerateReport</button>
   </div>
       <div class="lft">
<div class="card" >
   
   <table class="table table-bordered">
        <table class="table table-hover" >
                   <thead>
                       <tr>
                           <th>Customer ID</th>
                           <th>First Name</th>
                           <th>last Name</th>
                           <th>Email</th>
                           <th>Address</th>
                           <th>Phone No</th>
                           <th>username</th>
                           <th>password</th>
                           <th>Edit</th>
                           <th>Delete</th>

                       </tr>
                   </thead>
                   <tbody>
                       {
                           customers.map(function (f) {
                               return <tr>
                                   

                                   <td >{f.customerID}</td>
                                   <td >{f.first_name} </td>
                                   <td >{f.last_name} </td>
                                   <td >{f.email} </td>
                                   <td >{f.address} </td>
                                   <td >{f.phone} </td>
                                   <td >{f.username} </td>
                                   <td >{f.password} </td>
                                    

                                   <td > <IconButton aria-label="delete"  onClick={() => deleteCustomer(f._id)}>
                                       
               
         <DeleteIcon fontSize="small" />
       </IconButton></td>

       <td > <IconButton aria-label="delete"  >
                                       
               
                                       <EditIcon fontSize="small" />
                                     </IconButton></td>

                               </tr>

                           })
                       }
                   </tbody>
                   </table>
               </table>
</div>
</div>

       </>
   
   )

}