import { Form, Button, Row, Col, InputGroup, Container } from "react-bootstrap";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

 




function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({role_id:1});
  const [customer, setCustomer] = useState({});

  const [usertype, SetUserType] = useState(true);
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

  

  const HandleSubmit=(event)=>
  {
    
            var url;
            if (user.role_id == 1)
            {
              url = "https://localhost:44385/api/user_master/PostLogin"
              const requestOptions =
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
              };
              event.preventDefault();
              fetch(url, requestOptions)
              .then(res=>res.json())
              .then((result)=>{
                setCustomer(result)
                if(result)
                {
              sessionStorage.setItem("Name", result[0].first_name);
              sessionStorage.setItem("LastName",  result[0].last_name);
              sessionStorage.setItem("UserId",  result[0].user_id);
              sessionStorage.setItem("RoleId",  result[0].role_id);
              sessionStorage.setItem("IsLoggedIn",true);
              
              navigate("/");
              
                }
              else
              {
                console.log("hhhhhh");
                navigate("/Login")
              }
            })
            .catch(error => console.log('Form submit error: ', error));
          }
          if (user.role_id == 2)
            {
              url = "https://localhost:44385/api/publishers/PostLogin";
              const requestOptions =
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
              };
              event.preventDefault();
              fetch(url, requestOptions)
              .then(res=>res.json())
              .then((result)=>{
                setCustomer(result)
                if(result)
                {
              sessionStorage.setItem("Name", result[1].Ben_name);
              sessionStorage.setItem("UserId",  result[1].Ben_user_name);
              sessionStorage.setItem("BenId",  result[1].Ben_id);
              sessionStorage.setItem("RoleId",  2);
              sessionStorage.setItem("IsLoggedIn",true);
              
              navigate("/");
              
                }
              else
              {
                console.log("hhhhhh");
                navigate("/Login")
              }
            })
            .catch(error => console.log('Form submit error: ', error));
            }
           

          

            
             

  }
  



  const onButton = (event) => {
    
    if (event.target.value == "user") {
      SetUserType(true);
      setUser({ role_id: 1 })

    }
    if (event.target.value == "publisher") {
      SetUserType(false);
      setUser({ role_id: 2 })
    }
  };





  return (

    <div className="signup-form">
      <form onSubmit={HandleSubmit}>
        <div class="btn-group" >
          <button id="bt1" value="user" onClick={onButton} class="button">User</button>
          <button id="bt2" value="publisher" onClick={onButton} class="button">Publisher</button>
        </div>
        
<ChangeButton isClicked={usertype} handleChange={handleChange}/>
     </form>
      <div className="hint-text">Dont have an account? <a href="/Signup">Signup Now</a></div>
      Customer: {sessionStorage.getItem("Name")}
    </div>

  );
}


const ChangeButton = (props) => {
  let {isClicked,handleChange} = props;
  if (isClicked) 
  {
 return <>
 <h2>User Log In</h2>
        <p>Please login here!</p>
        <div className="form-group">
          <input type="text" className="form-control" name="user_name" placeholder="User ID" required="required"
            onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" name="password" placeholder="Password"
            required="required" onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn-grad">Log In</button>
        </div>

</>
;
  } 

else {
 return <>
 
 <h2>Publisher Log In</h2>
        <p>Please login here!</p>

        <div className="form-group">
          <input type="text" className="form-control" name="Ben_user_name" placeholder="User ID" required="required"
            onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" name="Ben_password" placeholder="Password"
            required="required" onChange={handleChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn-grad">Log In</button>
        </div>
      


     </>
        ;
}
 };

export default Login;
