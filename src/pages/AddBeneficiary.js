import { Form, Button, Row, Col, InputGroup, Container } from "react-bootstrap";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Formik, useFormik } from "formik";
import * as yup from 'yup';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import './Signup.css'
import Navigationbar from "./Navigationbar";


function AddBeneficiary() {
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
      Ben_PAN: ''
    }, 
    // validateOnSubmit: false,

    validationSchema: yup.object({
      Ben_name: yup.string()
        .required('Please Enter Name '),
      Ben_email_id: yup.string()
        .email('Invalid email address')
        .test('Unique Email', 'User with this Email Exists', // <- key, message
          function (value) {
            // console.log(value)
            return new Promise((resolve, reject) => {
              fetch(`https://localhost:44370/api/product_beneficiary_details/Checkemail/${value.slice(0,-4)}`)
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
        .min(1000000000, "only 10 digits allowed")
        .max(9999999999, "only 10 digits allowed")
        .required("please enter your 10 digit mobile number"),
      Ben_bank_name: yup.string()
        // .matches('/^[A-Za-z]+$/', "Only alphabets")
        .required('Please Enter Name '),
      Ben_bank_Branch: yup.string()
        // .matches('/^[A-Za-z]+$/', "Only alphabets")
        .required('Please Enter Name '),
      Ben_IFSC: yup.string()
        .max(10, "Only 10 Character allowed")
        .required('Please Enter Name '),
      Ben_AccNo: yup.string()
        .required('Please Enter Name '),
      Ben_Acc_Type: yup.string()
        .required('Please Enter Name '),
      Ben_PAN: yup.string()
        .required('Please Enter Name '),

    }),
    onSubmit: values => {
      console.log("inside submit")
      var url = 'https://localhost:44370/api/product_beneficiary_details/Postproduct_beneficiary_details'
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

    <><Navigationbar />
      <div class="signup-form3">

        <form className="form-horizontal" onSubmit={formikPub.handleSubmit}>

          <h2>Create Beneficiary</h2>
          <p>Please fill in this form to create new Beneficiary!</p>
          <div class="form-group">
            <input type="text" class="form-control" name="Ben_name"
              placeholder="Beneficiary Name" value={formikPub.values.Ben_name} {...formikPub.getFieldProps("Ben_name")} />
            {formikPub.touched.Ben_name && formikPub.errors.Ben_name ?
              <span style={{ color: 'red' }}>{formikPub.errors.Ben_name}</span> : null}
          </div>
          <br />
          <div class="form-group">
            <input type="text" class="form-control" name="Ben_email_id" placeholder="Email"
              value={formikPub.values.Ben_email_id} {...formikPub.getFieldProps("Ben_email_id")} />
            {formikPub.touched.Ben_email_id && formikPub.errors.Ben_email_id ?
              <span style={{ color: 'red' }}>{formikPub.errors.Ben_email_id}</span> : null}

          </div> <br />

          <div class="form-group">
            <input type="mobile" class="form-control" name="Ben_Contact_no"
              placeholder="Mobile Number" value={formikPub.values.Ben_Contact_no} {...formikPub.getFieldProps("Ben_Contact_no")} />
            {formikPub.touched.Ben_Contact_no && formikPub.errors.Ben_Contact_no ?
              <span style={{ color: 'red' }}>{formikPub.errors.Ben_Contact_no}</span> : null}
          </div> <br />

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
          </div><br />
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
          </div><br />

          <div class="form-group">
            <input type="text" class="form-control" name="Ben_AccNo" placeholder="Account Number" value={formikPub.values.Ben_AccNo} {...formikPub.getFieldProps("Ben_AccNo")} />
            {formikPub.touched.Ben_AccNo && formikPub.errors.Ben_AccNo ?
              <span style={{ color: 'red' }}>{formikPub.errors.Ben_AccNo}</span> : null}
          </div><br />

          <div class="form-group">
            <input type="text" class="form-control" name="Ben_PAN" placeholder="PAN Number" value={formikPub.values.Ben_PAN} {...formikPub.getFieldProps("Ben_PAN")} />
            {formikPub.touched.Ben_PAN && formikPub.errors.Ben_PAN ?
              <span style={{ color: 'red' }}>{formikPub.errors.Ben_PAN}</span> : null}
          </div><br />
          <div class="form-group">
            <button type="submit" class="btn-grad">Create</button>
          </div><br />
        </form>

      </div>
    </>

  );
}





export default AddBeneficiary;