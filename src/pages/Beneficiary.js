import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import { useNavigate } from 'react-router-dom';
import { NavLink, useParams } from "react-router-dom"
function Beneficiary(){
const [benif, setBenif] = useState([])
const { Id } = useParams()
let entry={"prodBenProductId":Id};
useEffect(() => 
{

    fetch("http://localhost:8080/crud/prodBenDetails")
        .then(res => res.json())
        .then((result) => setBenif(result));

}, [])


const changeHandler=(event)=>{
   
 entry= {...entry,"prodBenBenId":event.target.value}
 console.log(entry);
    
}
const percentHandler=(event)=>{
   
 entry= {...entry,"prodBenPercentage":event.target.value}
    
}

const handleSubmit=()=>{
   alert("insubmit")
    console.log("in submit")
    console.log(entry)
 
    const url = 'http://localhost:8080/crud/addProdBen'
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
        return<option id={elem.benId} value={elem.benId}  >BenifID:{elem.benId}  {elem.benName}</option>
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