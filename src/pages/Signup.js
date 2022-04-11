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
    }, validateOnSubmit: false,

    validationSchema: yup.object({
      first_name: yup.string()
        .required('Please Enter First Name '),
      last_name: yup.string()
        .required('Please Enter Last Name '),
      user_name: yup.string()
        .test('Unique Name', 'User Name Already Taken', // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              fetch(`http://localhost:8080/user/checkusername/${value}`)
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
        .test('Unique Email', 'User with this Email Exists', // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              fetch(`http://localhost:8080/user/checkuseremail/${value}`)
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
      var url = 'http://localhost:8080/crud/addUser'
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
      benName: '',
      benEmailId: '',
      benContactNo: '',
      benBankName: '',
      benBankBranch: '',
      benIfsc: "",
      benAccNo: '',
      benAccType: '',
      benPan: '',
      benUserName: '',
      benPassword: '',
    }, validateOnSubmit: false,

    validationSchema: yup.object({
      benName: yup.string()
        .required('Please Enter Name '),
      benEmailId: yup.string()
        .email('Invalid email address')
        .test('Unique Email', 'User with this Email Exists', // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              fetch(`http://localhost:8080/Beneficiary/checkuseremail/${value}`)
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
      benContactNo: yup.number()
      .min(1000000000,"only 10 digits allowed")
      .max(9999999999,"only 10 digits allowed")
        .required("please enter your 10 digit mobile number"),
      benBankName: yup.string()
        // .matches('/^[A-Za-z]+$/', "Only alphabets")
        .required('Please Enter Name '),
      benBankBranch: yup.string()
        // .matches('/^[A-Za-z]+$/', "Only alphabets")
        .required('Please Enter Name '),
      benIfsc: yup.string()
      .max(10,"Only 10 Character allowed")
        .required('Please Enter Name '),
      benAccNo: yup.string()
        .required('Please Enter Name '),
      benAccType: yup.string()
        .required('Please Enter Name '),
      benPan: yup.string()
        .required('Please Enter Name '),
      benUserName: yup.string()
        .test('Unique Name', 'User Name Already Taken', // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              fetch(`http://localhost:8080/Beneficiary/checkusername/${value}`)
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
      benPassword: yup.string()
        .min(8, "Password must be atleast 8 characters")
        .max(16, "maximum 16")
        .required("Please Enter a password"),

    }),
    onSubmit: values => {
      var url = 'http://localhost:8080/crud/benadd'
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
          <input type="text" class="form-control" name="benName"
            placeholder="Publication Name" value={formikPub.values.benName} {...formikPub.getFieldProps("benName")} />
          {formikPub.touched.benName && formikPub.errors.benName ?
            <span style={{ color: 'red' }}>{formikPub.errors.benName}</span> : null}
        </div>

        <div class="form-group">
          <input type="text" class="form-control" name="benEmailId" placeholder="Email"
            value={formikPub.values.benEmailId} {...formikPub.getFieldProps("benEmailId")} />
          {formikPub.touched.benEmailId && formikPub.errors.benEmailId ?
            <span style={{ color: 'red' }}>{formikPub.errors.benEmailId}</span> : null}

        </div>

        <div class="form-group">
          <input type="mobile" class="form-control" name="benContactNo"
            placeholder="Mobile Number" value={formikPub.values.benContactNo} {...formikPub.getFieldProps("benContactNo")} />
          {formikPub.touched.benContactNo && formikPub.errors.benContactNo ?
            <span style={{ color: 'red' }}>{formikPub.errors.benContactNo}</span> : null}
        </div>


        <div class="form-group">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" name="benUserName" placeholder="User ID" value={formikPub.values.benUserName} {...formikPub.getFieldProps("benUserName")} />
              {formikPub.touched.benUserName && formikPub.errors.benUserName ?
                <span style={{ color: 'red' }}>{formikPub.errors.benUserName}</span> : null}
            </div>

            <div class="col">
              <input type="password" class="form-control" name="benPassword" placeholder="Password" value={formikPub.values.benPassword} {...formikPub.getFieldProps("benPassword")} />
              {formikPub.touched.benPassword && formikPub.errors.benPassword ?
                <span style={{ color: 'red' }}>{formikPub.errors.benPassword}</span> : null}
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" name="benBankName" placeholder="Bank Name" value={formikPub.values.benBankName} {...formikPub.getFieldProps("benBankName")} />
              {formikPub.touched.benBankName && formikPub.errors.benBankName ?
                <span style={{ color: 'red' }}>{formikPub.errors.benBankName}</span> : null}
            </div>
            <div class="col">
              <input type="text" class="form-control" name="benBankBranch" placeholder="Bank Branch" value={formikPub.values.benBankBranch} {...formikPub.getFieldProps("benBankBranch")} />
              {formikPub.touched.benBankBranch && formikPub.errors.benBankBranch ?
                <span style={{ color: 'red' }}>{formikPub.errors.benBankName}</span> : null}
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" name="benIfsc" placeholder="IFSC" value={formikPub.values.benIfsc} {...formikPub.getFieldProps("benIfsc")} />
              {formikPub.touched.benIfsc && formikPub.errors.benIfsc ?
                <span style={{ color: 'red' }}>{formikPub.errors.benIfsc}</span> : null}
            </div>
            <div class="col">
              <select class="form-control" name="benAccType" id="benAccType" value={formikPub.values.benAccType} {...formikPub.getFieldProps("benAccType")}>
                <option>Choose Account type</option>
                <option value="Saving">Saving</option>
                <option value="Current">Current</option>
                {formikPub.touched.benAccType && formikPub.errors.benAccType ?
                  <span style={{ color: 'red' }}>{formikPub.errors.benAccType}</span> : null}
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <input type="text" class="form-control" name="benAccNo" placeholder="Account Number" value={formikPub.values.benAccNo} {...formikPub.getFieldProps("benAccNo")} />
          {formikPub.touched.benAccNo && formikPub.errors.benAccNo ?
            <span style={{ color: 'red' }}>{formikPub.errors.benAccNo}</span> : null}
        </div>

        <div class="form-group">
          <input type="text" class="form-control" name="benPan" placeholder="PAN Number" value={formikPub.values.benPan} {...formikPub.getFieldProps("benPan")} />
          {formikPub.touched.benPan && formikPub.errors.benPan ?
            <span style={{ color: 'red' }}>{formikPub.errors.benPan}</span> : null}
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