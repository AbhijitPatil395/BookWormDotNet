import React from 'react';
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import { NavLink, useParams } from "react-router-dom"
import '../PublisherProduct.css';
import Edit from './Edit';
import Navigationbar from './Navigationbar';


function Royalty(props) {
    

    const [PublisherProduct, setPublisherProduct] = useState([]);
    const [PProduct, setPProduct] = useState([]);
    const { Id } = useParams()
    const benId=sessionStorage.getItem("UserId");
    useEffect(() => {
        fetch("http://localhost:8080/Royalty/getbRoyalty/"+benId)
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result);
            console.log(result[0])}
            );
            
    }, []);
    

    const isRentable=(event)=>
    {
        if(event.target.value==1){
        fetch("http://localhost:8080/Royalty/getbRoyaltyRent/" +benId )
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result); }
            );
        }
        else{
            fetch("http://localhost:8080/Royalty/getbRoyalty/"+benId)
            .then(res => res.json())
            .then((result) => { setPublisherProduct(result); setPProduct(result);
            console.log(result[0])}
            );
        }
    }
    
    // const isLibrary=(event)=>{
    //     fetch("http://localhost:8080/crud/libraryproductsearch/" + event.target.value)
    //         .then(res => res.json())
    //         .then((result) => { setPublisherProduct(result); setPProduct(result); }
    //         );
    // }

    // const isProductType=(event)=>{
    //     fetch("http://localhost:8080/crud/prodtypeproductsearch/" + event.target.value)
    //         .then(res => res.json())
    //         .then((result) => { setPublisherProduct(result); setPProduct(result); }
    //         );
    // }
    
    

    // const letsdelete=(event)=>{
    //     fetch("http://localhost:8080/crud/productDelete/" + event.target.value)
    //         .then(res => res.json())
    //         .then((result) => { setPublisherProduct(result); setPProduct(result); }
    //         );
    // }

    const navigate = useNavigate();

    const letsEdit=(Id)=>{
        navigate('Edit/'+Id);
    }


    return (
        <><Navigationbar/>
                
                    
                <div className=""><br/>
                    <h1 className="heading-line">My Royalty!</h1>
                    <div className="og-row" id="og-filters">
                        
                        <select onChange={isRentable} className="" id="relocation" placeholder="Relocation" >
                            <option value="" selected="">Rentable?</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                       {/*  <input type="text" name="state" id="location" className="form-control" placeholder="Search book" >
                            
                        </input> */}
                    </div>

                    <div className="og-row og-li og-li-head">
                        <div className="og-li-col og-li-col-7 ">Book Name</div>
                        <div className="og-li-col og-li-col-2 text-center">Sold Quantity</div>
                       
                        <div className="og-li-col og-li-col-3 text-center">Royalty</div>
                        {/* <div className="og-li-col og-li-col-8 text-center">IsLibrary</div>
                        <div className="og-li-col og-li-col-8 text-center">IsRentable</div> */}
                    </div>
        { PublisherProduct.map(
            Product => (
             <div className="data-row og-row og-li Experienced Engineering 7.3 ready_to_hire Andhra Pradesh Yes">
                 <div className="og-li-col og-li-col-7 "><span>{Product[0]}</span></div>
                  <div className="og-li-col og-li-col-2 text-center"><span>{Product[4]  }</span></div> 
               
                 <div className="og-li-col og-li-col-3   text-center"><span>{Product[3]}</span></div>
              
                 {/* <div className="og-li-col og-li-col-7 text-center"><span>{new Date(Product.productOfferpriceExpirydate).toUTCString()}</span></div>
                 <div className="og-li-col og-li-col-7 text-center"><span><a class="btn btn-primary" href={'/Edit/'+Product.productId} role="button">Edit</a><button type="button" class="btn btn-danger" >Delete</button></span></div> */}
                 {/* <button style = {{color:'red'}} onClick={()=>letsEdit(Product.productId)} ></button> */}
                 {/* <div className="og-li-col og-li-col-8 text-center"><span>{Product.isLibrary}</span></div>
                 <div className="og-li-col og-li-col-8 text-center"><span>{Product.isRentable}</span></div> */}
             </div>
         ))}
          <div id="no-match" className="no-match og-li  text-center hide">Sorry, No Student Matches your Criteria</div>
                </div>

                   
                   
                </>
        )
    
}

export default Royalty;
