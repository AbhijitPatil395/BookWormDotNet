import { Form, Button, Row, Col, InputGroup, Container } from "react-bootstrap";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Formik, useFormik } from "formik";
import * as yup from 'yup';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Signup.css'


function Signup() {
  const [usertype, SetUserType] = useState(true);

  let navigate = useNavigate();

  const onButton = (event) => {
    if (event.target.value == "user") {
      SetUserType(true);
    }
    else {
      SetUserType(false);
    }
  };


 
  const formikUser = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      user_name: '',
      email_id: '',
      password: '',
      mobile_no: '',
      role_id: 1
    },
      validateOnSubmit:true, 
    validationSchema: yup.object({
      first_name: yup.string()
        .required('Please Enter First Name '),
      last_name: yup.string()
        .required('Please Enter Last Name '),
      user_name: yup.string()
        .test('Unique Name', 'User Name Already Taken', // <- key, message
          function (value) {
            console.log(value)
            return new Promise((resolve, reject) => {
              fetch(`https://localhost:44370/api/user_master/GetUserName/${value}`)
                .then(res => res.json())
                .then((result) => {
                  if (result === "The Username has already been taken.") {
                    resolve(false);
                  }
                  else {
                    resolve(true);
                  }
                })
                
            })
          }

        )
        .required('Please Enter user Name '),
      email_id: yup.string()
        .email('Invalid email address')
        .test('Unique Email', 'User with this Email Exists', 
          function (value) {
            console.log(value)
            return new Promise((resolve, reject) => {
              if(value.length>4)
              fetch(`https://localhost:44370/api/user_master/GetEmail/${value.slice(0,-4)}`)
                .then(res => res.json())
                .then((result) => {
                  if (result === "The Email has already been taken.") {
                    resolve(false);
                  }
                  else {
                    resolve(true);
                  }
                })
               
            })
          }

        )
        .required('Please Enter Email Id'),
      password: yup.string()
        .min(8, "Password must be atleast 8 characters")
        .max(16, "maximum 16")
        .required("Please Enter a password"),
      mobile_no: yup.number()
      .min(1000000000,"only 10 digits allowed")
      .max(9999999999,"only 10 digits allowed")
        // .matches('/^[0-9]{10}$/', "please enter 10 digit number")
        .required("please enter your 10 digit mobile number"),
    }),
    onSubmit: values => {
      var url = 'https://localhost:44370/api/user_master/PostNewUser'
      const requestOptions =
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };
      fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error: ', error))
        alert("Registered Successfully")
      navigate("/")
    }
  })

  //Formik for Publisher
  const formikPub = useFormik({
    initialValues: {
      Ben_name: '',
      Ben_email_id: '',
      Ben_Contact_no: '',
      Ben_bank_name: '',
      Ben_bank_Branch: '',
      Ben_IFSC: "",
      Ben_AccNo: '',
      Ben_Acc_Type: '',
      Ben_PAN: '',
      Ben_user_name: '',
      Ben_password: '',
    }, validateOnSubmit: false,

    validationSchema: yup.object({
      Ben_name: yup.string()
        .required('Please Enter Name '),
      Ben_email_id: yup.string()
        .email('Invalid email address')
        .test('Unique Email', 'User with this Email Exists', // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              if(value.length>4)
              fetch(`https://localhost:44370/api/publishers/GetEmail/${value.slice(0,-4)}`)
                .then(res => res.json())
                .then((result) => {
                  if (result === "The Email has already been taken.") {
                    resolve(false);
                  }
                  else {
                    resolve(true);
                  }
                })
            })
          }

        )
        .required('Please Enter Email id '),
      Ben_Contact_no: yup.number()
      .min(1000000000,"only 10 digits allowed")
      .max(9999999999,"only 10 digits allowed")
        .required("please enter your 10 digit mobile number"),
      Ben_bank_name: yup.string()
        // .matches('/^[A-Za-z]+$/', "Only alphabets")
        .required('Please Enter Name '),
      Ben_bank_Branch: yup.string()
        // .matches('/^[A-Za-z]+$/', "Only alphabets")
        .required('Please Enter Name '),
      Ben_IFSC: yup.string()
      .max(10,"Only 10 Character allowed")
        .required('Please Enter Name '),
      Ben_AccNo: yup.string()
        .required('Please Enter Name '),
      Ben_Acc_Type: yup.string()
        .required('Please Enter Name '),
      Ben_PAN: yup.string()
        .required('Please Enter Name '),
      Ben_user_name: yup.string()
        .test('Unique Name', 'User Name Already Taken', // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              fetch(`https://localhost:44370/api/publishers/GetUserName/${value}`)
                .then(res => res.json())
                .then((result) => {
                  if (result === "The username has already been taken.") {
                    resolve(false);
                  }
                  else {
                    resolve(true);
                  }
                })
            })
          }

        )
        .required('Please Enter user Name '),
      Ben_password: yup.string()
        .min(8, "Password must be atleast 8 characters")
        .max(16, "maximum 16")
        .required("Please Enter a password"),

    }),
    onSubmit: values => {
      var url = 'https://localhost:44370/api/publishers/PostNewUser'
      const requestOptions =
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };
      fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error: ', error))
        alert("Registered successfully")
      navigate("/")
    }
  })


  return (
    

      <ChangeButton isClicked={usertype} formikUser={formikUser} formikPub={formikPub} onButton={onButton}/>
      
  );
}


const ChangeButton = (props) => {
  let { isClicked, formikUser, formikPub,onButton } = props;
  if (isClicked) {
    return (<>
    <div class="signup-form">

      <form onSubmit={formikUser.handleSubmit}>
      <div class="btn-group" >
  <button id="bt1" value="user" onClick={onButton} class="button">User</button>
  <button id="bt2" value="publisher" onClick={onButton} class="button">Publisher</button>
</div>
      <h2>User Sign Up</h2>
      <p>Please fill in this form to create an account!</p>
        <div class="form-group">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" name="first_name" value={formikUser.values.first_name} {...formikUser.getFieldProps("first_name")}
                placeholder="First Name" />{formikUser.touched.first_name && formikUser.errors.first_name ?
                  <span style={{ color: 'red' }}>{formikUser.errors.first_name}</span> : null}</div>

            <div class="col">
              <input type="text" class="form-control " name="last_name" value={formikUser.values.last_name} {...formikUser.getFieldProps("last_name")}
                placeholder="Last Name" />{formikUser.touched.last_name && formikUser.errors.last_name ?
                  <span style={{ color: 'red' }}>{formikUser.errors.last_name}</span> : null}
            </div>
          </div>
        </div>

        <div class="form-group">
          <input type="email" class="form-control" name="email_id" placeholder="Email" value={formikUser.values.email_id} {...formikUser.getFieldProps("email_id")} />
          {formikUser.touched.email_id && formikUser.errors.email_id ?
            <span style={{ color: 'red' }}>{formikUser.errors.email_id}</span> : null}
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="user_name" placeholder="User ID" value={formikUser.values.user_name} {...formikUser.getFieldProps("user_name")} />
          {formikUser.touched.user_name && formikUser.errors.user_name ?
            <span style={{ color: 'red' }}>{formikUser.errors.user_name}</span> : null}
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name="password" placeholder="Password" value={formikUser.values.password} {...formikUser.getFieldProps("password")} />
          {formikUser.touched.password && formikUser.errors.password ?
            <span style={{ color: 'red' }}>{formikUser.errors.password}</span> : null}
        </div>
        <div class="form-group">
          <input type="mobile" class="form-control" name="mobile_no" value={formikUser.values.mobile_no} {...formikUser.getFieldProps("mobile_no")}
            placeholder="8888888888" />
          {formikUser.touched.mobile_no && formikUser.errors.mobile_no ?
            <span style={{ color: 'red' }}>{formikUser.errors.mobile_no}</span> : null}
        </div>
        <div class="form-group">
          <label class="checkbox-inline"><input type="checkbox" name="role_id" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
        </div>
        <div class="form-group">
          <button type="submit" class="btn-grad">Sign Up</button>
        </div>
      </form>
      <div class="hint-text">Already have an account? <a href="/Login">Login here</a></div>
    </div>
    </>
    );
  }
  else {
    return <>
    <div class="signup-form">

      <form onSubmit={formikPub.handleSubmit}>
      <div class="btn-group" >
  <button id="bt1" value="user" onClick={onButton} class="button">User</button>
  <button id="bt2" value="publisher" onClick={onButton} class="button">Publisher</button>
</div>
      <h2>Publisher Sign Up</h2>
      <p>Please fill in this form to create an account!</p>
        <div class="form-group">
          <input type="text" class="form-control" name="Ben_name"
            placeholder="Publication Name" value={formikPub.values.Ben_name} {...formikPub.getFieldProps("Ben_name")} />
          {formikPub.touched.Ben_name && formikPub.errors.Ben_name ?
            <span style={{ color: 'red' }}>{formikPub.errors.Ben_name}</span> : null}
        </div>

        <div class="form-group">
          <input type="text" class="form-control" name="Ben_email_id" placeholder="Email"
            value={formikPub.values.Ben_email_id} {...formikPub.getFieldProps("Ben_email_id")} />
          {formikPub.touched.Ben_email_id && formikPub.errors.Ben_email_id ?
            <span style={{ color: 'red' }}>{formikPub.errors.Ben_email_id}</span> : null}

        </div>

        <div class="form-group">
          <input type="mobile" class="form-control" name="Ben_Contact_no"
            placeholder="Mobile Number" value={formikPub.values.Ben_Contact_no} {...formikPub.getFieldProps("Ben_Contact_no")} />
          {formikPub.touched.Ben_Contact_no && formikPub.errors.Ben_Contact_no ?
            <span style={{ color: 'red' }}>{formikPub.errors.Ben_Contact_no}</span> : null}
        </div>


        <div class="form-group">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" name="Ben_user_name" placeholder="User ID" value={formikPub.values.Ben_user_name} {...formikPub.getFieldProps("Ben_user_name")} />
              {formikPub.touched.Ben_user_name && formikPub.errors.Ben_user_name ?
                <span style={{ color: 'red' }}>{formikPub.errors.Ben_user_name}</span> : null}
            </div>

            <div class="col">
              <input type="password" class="form-control" name="Ben_password" placeholder="Password" value={formikPub.values.Ben_password} {...formikPub.getFieldProps("Ben_password")} />
              {formikPub.touched.Ben_password && formikPub.errors.Ben_password ?
                <span style={{ color: 'red' }}>{formikPub.errors.Ben_password}</span> : null}
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" name="Ben_bank_name" placeholder="Bank Name" value={formikPub.values.Ben_bank_name} {...formikPub.getFieldProps("Ben_bank_name")} />
              {formikPub.touched.Ben_bank_name && formikPub.errors.Ben_bank_name ?
                <span style={{ color: 'red' }}>{formikPub.errors.Ben_bank_name}</span> : null}
            </div>
            <div class="col">
              <input type="text" class="form-control" name="Ben_bank_Branch" placeholder="Bank Branch" value={formikPub.values.Ben_bank_Branch} {...formikPub.getFieldProps("Ben_bank_Branch")} />
              {formikPub.touched.Ben_bank_Branch && formikPub.errors.Ben_bank_Branch ?
                <span style={{ color: 'red' }}>{formikPub.errors.Ben_bank_name}</span> : null}
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" name="Ben_IFSC" placeholder="IFSC" value={formikPub.values.Ben_IFSC} {...formikPub.getFieldProps("Ben_IFSC")} />
              {formikPub.touched.Ben_IFSC && formikPub.errors.Ben_IFSC ?
                <span style={{ color: 'red' }}>{formikPub.errors.Ben_IFSC}</span> : null}
            </div>
            <div class="col">
              <select class="form-control" name="Ben_Acc_Type" id="Ben_Acc_Type" value={formikPub.values.Ben_Acc_Type} {...formikPub.getFieldProps("Ben_Acc_Type")}>
                <option>Choose Account type</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
                {formikPub.touched.Ben_Acc_Type && formikPub.errors.Ben_Acc_Type ?
                  <span style={{ color: 'red' }}>{formikPub.errors.Ben_Acc_Type}</span> : null}
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" name="Ben_AccNo" placeholder="Account Number" value={formikPub.values.Ben_AccNo} {...formikPub.getFieldProps("Ben_AccNo")} />
          {formikPub.touched.Ben_AccNo && formikPub.errors.Ben_AccNo ?
            <span style={{ color: 'red' }}>{formikPub.errors.Ben_AccNo}</span> : null}
        </div>

        <div class="form-group">
          <input type="text" class="form-control" name="Ben_PAN" placeholder="PAN Number" value={formikPub.values.Ben_PAN} {...formikPub.getFieldProps("Ben_PAN")} />
          {formikPub.touched.Ben_PAN && formikPub.errors.Ben_PAN ?
            <span style={{ color: 'red' }}>{formikPub.errors.Ben_PAN}</span> : null}
        </div>
        <div class="form-group">
          <label class="checkbox-inline"><input type="checkbox" name="role_id" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
        </div>
        <div class="form-group">
          <button type="submit" class="btn-grad">Sign Up</button>
        </div>
      </form>
      <div class="hint-text">Already have an account? <a href="/Login">Login here</a></div>
    </div>
    </>
  }

};


export default Signup;