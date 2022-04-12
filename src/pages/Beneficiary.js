import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import { useNavigate } from 'react-router-dom';
import { NavLink, useParams } from "react-router-dom"
function Beneficiary(){
const [benif, setBenif] = useState([])
const { Id } = useParams()
let entry={"ProdBen_product_id":Id};
useEffect(() => 
{

    fetch("https://localhost:44370/api/product_beneficiary_details/Getproduct_beneficiary_details")
        .then(res => res.json())
        .then((result) => setBenif(result));

}, [])


const changeHandler=(event)=>
{
  
 entry= {...entry,"ProdBen_ben_id":event.target.value}
 console.log(entry);
    
}
const percentHandler=(event)=>{
   
 entry= {...entry,"ProdBen_percentage":event.target.value}
    
}

const handleSubmit=()=>{
   alert("insubmit")
    console.log("in submit")
    console.log(entry)
 
    const url = 'https://localhost:44370/api/product_ben/Postproduct_ben'
    const requestOptions = 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
    };
   fetch(url, requestOptions)
        .then(response =>console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error: ', error))
        
     
}
return(<><Navigationbar/>
<form className="container-fluid" onSubmit={handleSubmit}>
  <fieldset >
    <legend>Add Beneficiary</legend>
   
    <div class="row g-3">
  <div class="col-md-4  mx-auto">
  

    <label for="inputState" class="form-label">For BookID:{Id}</label>
  
    <select id="inputState" class="form-select"  onChange={changeHandler}>
    
    
    {benif.map(elem=>{
        return<option id={elem.Ben_id} value={elem.Ben_id}  >BenifID:{elem.Ben_id}  {elem.Ben_name}</option>
    }
     )} 
    </select>
    
   
  </div>
  </div>
   <br/>
    <div class="row g-3">
  <div class="col-md-4 mx-auto">
    <input type="text" onChange={percentHandler} class="form-control" placeholder="%" aria-label="First name"/>
  </div>
  </div>
 
  <br/>
    <button type="submit" class="btn btn-primary" >Submit</button>
    <a class="btn btn-primary" href="/AddBeneficiary" role="button">Create beneficiary</a>
  </fieldset>
</form></>
);




}



export default Beneficiary;


/* {benif.forEach(elem=>(
         <option value={elem.benId} >{elem.benId}.{elem.benName}lll</option>
     ))} */