import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigationbar from './Navigationbar';
function Edit() {

    //const [product, setProd] = useState({});
    let userid=sessionStorage.getItem("BenId")
    const { Id } = useParams();
    let navigate = useNavigate(); 
    const [imgfile,setImgFile]=useState();
    const [imgName,setImgFileName]=useState();
    const [pdffile,setPdfFile]=useState();
    const [pdfName,setPdfFileName]=useState();
    const [product, setProd] = useState({product_publisher:userid});
    useEffect(() => {
        fetch("https://localhost:44370/api/products/Getproduct/" + Id)
            .then(res => res.json())
            .then((result) => { setProd(result);console.log("useeffect product Id:"+Id)  }
            );
    }, []);


    const handleChange = (event) => 
    {
        const name = event.target.name;
        const value = event.target.value;
        setProd(values => ({ ...values, [name]: value }))
        console.log(product);
        console.log("product Id:"+Id)
    }
    const imgHandler = (event) => 
    {
        console.log("inside img handler")
        setImgFile(event.target.files[0])
        setImgFileName(event.target.files[0].name)
        setProd({...product,product_image:event.target.files[0].name});
    
    }
    const fileHandler = (event) => 
    {
        console.log("inside file handler")
        setPdfFile(event.target.files[0])
        setPdfFileName(event.target.files[0].name)
        setProd({...product,product_pdf:event.target.files[0].name});
    
    }
     const handleSubmit = (event) => 
     {
        let demo = JSON.stringify(product);
        console.log(JSON.parse(demo));
        console.log("product Id:"+Id)
        
        // fetch("http://localhost:8080/crud/productupdate", {
        //     method: 'PUT',
        //     headers: { 'Content-type': 'application/json' },
        //     body: demo
        // }).then(res => res.json());
       
        //   navigate('/PublisherProduct'); 
        const requestOptions = 
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: demo
        };
      
          fetch("https://localhost:44370/api/products/Putproduct/"+Id, requestOptions)
            .then(response => console.log('Submitted successfully'))
            .catch(error => console.log('Form submit error: ', error))
             

              alert("Updated Successfully"+userid)
              navigate("/PublisherProduct/"+userid)
        event.preventDefault(); 
        // alert(employee);
      }
 

    

          
    return (
      <><Navigationbar/>
          <form className="form-horizontal" onSubmit={handleSubmit}>
<legend>ADD PRODUCT DETAILS</legend><br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT NAME</label>  </div>
  <div className="col">
  <input id="product_name" onChange={handleChange} value={product.product_name || ""} name="product_name" placeholder="PRODUCT ENGLISH NAME" className="form-control input-md" required="" type="text"/>
 
  
  </div>
</div>
<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT ENGLISH NAME</label>  </div> 
  <div className="col">
  <input id="english" onChange={handleChange} value={product.product_english_name || ""}  name="product_english_name" placeholder="PRODUCT ENGLISH NAME" className="form-control input-md" required="" type="text"/>
    
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT TYPE</label></div>
  <div className="col">
    <select id="productType" value={product.product_type || ""}   onChange={handleChange} name="product_type" className="form-control">
        <option>Select Product type</option>
        <option id='1' value={1}>E-Book</option>
        <option id='2' value={2}>Audio-Book</option>
    </select>
  </div>
</div>


<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT BASE PRICE</label>  </div>
  <div className="col">
  <input id="gyg"  onChange={handleChange} value={product.product_baseprice || ""} name="product_baseprice" placeholder="PRODUCT BASE PRICE" className="form-control input-md" required="" type="text"/>
    
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT SELLING PRICE</label> </div> 
  <div className="col">
  <input id="oioi"  onChange={handleChange} value={product.product_sp_cost || ""} name="product_sp_cost" placeholder="PRODUCT SP" className="form-control input-md" required="" type="text"/>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label">PRODUCT OFFER PRICE</label>  </div>
  <div className="col">
  <input id="product_offerprice" value={product.product_offerprice || ""}  onChange={handleChange} name="product_offerprice" placeholder="PRODUCT Offer Price" className="form-control input-md" required="" type="text"/>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT OFFER EXPIRY</label>  </div>
  <div className="col">
  <input id="product_offerprice_expiry" value={product.product_offerprice_expirydate || ""}  onChange={handleChange} name="product_offerprice_expirydate"  className="form-control input-md" required="" type="date"/>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label">PRODUCT DESCRIPTION SHORT</label></div>
  <div className="col">                     
    <textarea className="form-control"  value={product.product_desc_short || ""}  onChange={handleChange} id="product_desc_short" name="productDescShort"></textarea>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT DESCRIPTION LONG</label></div>
  <div className="col">                     
    <textarea className="form-control" value={product.product_desc_long || ""}   onChange={handleChange} id="product_desc_long" name="productDescLong"></textarea>
  </div>
</div>


<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT ISBN</label>  </div>
  <div className="col">
  <input id="product_isbn"  onChange={handleChange} value={product.product_isbn || ""}  name="product_isbn" placeholder="PRODUCT ISBN" className="form-control input-md" required="" type="text"/>
    
  </div>
</div>


<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT AUTHOR ID</label>  </div>
  <div className="col">
  <input id="stock_alert"  onChange={handleChange} value={product.product_author_id || ""}  name="product_author_id" placeholder="product_author_id" className="form-control input-md" required="" type="text"/>
    
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT LANGUAGE</label></div>
  <div className="col">
    <select id="product_language" value={product.product_language || ""}   onChange={handleChange} name="product_language" className="form-control">
      
    <option id='1' value={1}>MARATHI</option>
        <option id='2' value={5}>HINDI</option>
        <option id='3' value={3}>ENGLISH</option>
    </select>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT GENRE</label></div>
  <div className="col">
  <select id="product_genre" onChange={handleChange} value={product.product_genere || ""}  name="product_genere" className="form-control">
  <option id='1' value={6}>COMIC</option>
        <option id='2' value={4}>BIOPIC</option>
        <option id='3' value={5}>HORROR</option>
    </select>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >Is Rentable</label></div>
  <div className="col">
    <input id="is_rent" value={true} onChange={handleChange}  name="is_rentable" className="input-file" type="checkbox"/>
    &nbsp;&nbsp;&nbsp;Do you want to make this book available for Rent?
  </div>
</div>
<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT PER DAY PRICE if it is Rentable</label>  </div>
  <div className="col">
  <input id="gyg"  onChange={handleChange} value={product.product_baseprice_perday || ""}  name="product_baseprice_perday" placeholder="PRODUCT PER DAY PRICE if rentable" className="form-control input-md" required="" type="text"/>
    
  </div>
</div>

{/* <input type="radio" name="yes_no" checked>Yes</input>
<input type="radio" name="yes_no">No</input> */}
{/* <div className="form-group">
  <label className="col-md-4 control-label" for="stock_critical">IS RENTABLE?</label>
  <div className="col-md-4">
    <input id="is_rentable" name="is_rentable" type="radio"className="form-control input-md" required=""> YES</input>
    <input id="is_rentable" name="is_rentable" type="radio" className="form-control input-md" required=""> NO</input>
  </div>
</div> */}

{/* <div className="form-group">
  <label className="col-md-4 control-label" for="stock_critical">IS LIBRARY?</label>
  <div className="col-md-4">
    <input id="is_library" name="is_library" type="radio"className="form-control input-md" required=""> YES</input>
    <input id="is_library" name="is_library" type="radio" className="form-control input-md" required=""> NO</input>
  </div>
</div> */}


<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT IMAGE</label></div>
  <div className="col">
    <input id="product_image" onChange={imgHandler}  name="product_image" className="input-file" type="file"/>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
  <label className="col-md-4 control-label" >PRODUCT FILE</label></div>
  <div className="col">
    <input id="product_file" onChange={fileHandler} name="product_pdf" className="input-file" type="file"/>
  </div>
</div>

<br/>
<div className="row">
<div className="col">
<label className="col-md-4 control-label" >SUBMIT NOW</label> </div>
  <div className="col">
    <button id="singlebutton" name="singlebutton" className="btn btn-primary">Submit</button><br/><br/>
  </div>
  </div>
</form>
      </>

)
    
}

export default Edit
