import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navigationbar from "./Navigationbar";
import { useNavigate } from 'react-router-dom';
function Library() 
{

    const navigate=useNavigate();
    const isLoggedIn=sessionStorage.getItem("IsLoggedIn");
    const [tran, setTran] = useState('p')
    const [lang,setLang]= useState([]);
    const [genere,setGenere]= useState([]);
    const UserId=sessionStorage.getItem("UserId");
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [filteredData2, setFilteredData2] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/crud/products")
            .then(res => res.json())
            .then((result) => { setData(result);console.log(result); setFilteredData(result); setFilteredData2(result); });
        fetch("http://localhost:8080/language/get")
            .then(res => res.json())
            .then((result) =>{setLang(result)});
        fetch("http://localhost:8080/genere/get")
            .then(res => res.json())
            .then((result) =>{setGenere(result)});
    }, [])

    const onButton = (val) => {
        // console.log(event.target.value)
        if (val=="buy"){
            console.log(val);
            setFilteredData(data);
            setFilteredData2(data);
            setTran('p')
        }
        else{
            console.log("inside else")
            setFilteredData2(data.filter((elem) => elem.isRentable == true));
            setFilteredData(data.filter((elem) => elem.isRentable == true));
            setTran('r');
            
        }

    };
    const onFilterLang = (event) => {
                console.log(event.target.value)
                let val=event.target.value;
                console.log(val)
                if(val==1)
                {console.log("case1");
                setFilteredData(filteredData2.filter((elem) => elem.productLanguage=='1'));}
                else if(val==2)
                {console.log("case2");
                setFilteredData(filteredData2.filter((elem) => elem.productLanguage=='2')); }
                else if(val==4)
                {console.log("case4");
                setFilteredData(filteredData2.filter((elem) => elem.productLanguage=='4')); }
                else if(val==3)
                {console.log("case3");
                setFilteredData(filteredData2.filter((elem) => elem.productLanguage =='3'));}
                else if(val==4)
                {console.log("case4");
                setFilteredData(filteredData2.filter((elem) => elem.productLanguage =='4'));}
                else if(val==5)
                {console.log("case5");
                setFilteredData(filteredData2.filter((elem) => elem.productLanguage =='5')); }
                else if(val==0)
                {console.log("case0");
                setFilteredData(filteredData2);
                }
                else
                {setFilteredData=[];}
              
    };

    const onFilterGenere = (event) => {
        console.log(event.target.value)
        let val=event.target.value;
        console.log(val)
        if(val==1)
        {console.log("case1");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='1'));}
        else if(val==2)
        {console.log("case2");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='2'));}
        else if(val==3)
        {console.log("case3");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='3'));}
        else if(val==4)
        {console.log("case4");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='4'));}
        else if(val==5)
        {console.log("case5");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='5'));}
        else if(val==6)
        {console.log("case6");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='6'));}
        else if(val==7)
        {console.log("case7");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='7'));}
        else if(val==8)
        {console.log("case8");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='8'));}
        else if(val==9)
        {console.log("case9");
        setFilteredData(filteredData2.filter((elem) => elem.productGenere =='9'));}
        else if(val==0)
        {console.log("case0");
        setFilteredData(filteredData2);
        }
        else
        {setFilteredData=[];}
      
};
    
    const submitHandler = (id) => 
    {
        if(isLoggedIn)
        {
            const cart = { 'productId': id, 'userId': UserId, 'isSelected': 'Y' }
            const url = "http://localhost:8080/crud/addtocart"
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart)
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => { alert(result) })
        }   
        else
        {
            var z = window.confirm("Please Log In First!");
            if(z)
            navigate("/Login");
            if(z==false)
            navigate('/Library');
        }

    }
    const rentHandler = () => {





    }

    return (
        <><Navigationbar/>
        <Container fluid style={{ textAlign: 'left' }}>
            <Row style={{ padding: '10px' }}>
                <Col xs={2}><h2><b>bookWorm</b></h2></Col>
                <Col xs={4}><h2>Books to Sell</h2></Col>
                <Col xs={4}>
                    <div class="btn-group" >
                        <Button variant="light" id="bt1" onClick={()=>onButton("buy")} value="buy" class="button">&nbsp;&nbsp;&nbsp;Buy&nbsp;&nbsp;&nbsp;</Button>
                        <Button variant="light" id="bt2" onClick={()=>onButton("rent")} value="rent" class="button">&nbsp;&nbsp;&nbsp;Rent&nbsp;&nbsp;&nbsp;</Button>

                    </div>
                </Col>
                {isLoggedIn?<Col xs={2}><Link to="/Cart"> <Button variant="primary" style={{ align: 'right' }}>Visit Cart{'>'}</Button></Link></Col>:''}
            </Row>
            <Row>
                <Col xs={2}><h2><b>

                    <Container style={{ paddingTop: '70px' }}>
                        <Row style={{ paddingBottom: "30px", fontSize:"50px",paddingLeft:"10px"}}>
                            <Button style={{padding:"10px"}} variant="light" value={0} onClick={onFilterLang}><b>All Books</b></Button>
                        </Row>
                        <Row style={{ paddingBottom: "30px", fontSize:"18px",paddingLeft:"22px"}} >
                            <select onChange={onFilterLang}>
                                <option value={0}>Language</option>
                                {console.log(lang)}
                                {lang.map(elem=>{
                                    return<option value={elem.langId}>{elem.langDesc}</option>
                                })}
                            </select>                           
                        </Row>

                        <Row style={{ paddingBottom: "20px", fontSize:"18px",paddingLeft:"22px"}}>
                        <select onChange={onFilterGenere}>
                                <option value={0}>Genere</option>
                                {console.log(genere)}
                                {genere.map(elem=>{
                                    return<option value={elem.genereId}>{elem.genereDesc}</option>
                                })}
                            </select> 
                        </Row>
                    </Container>
                </b></h2></Col>
                <Col xs={9}><h2>
                    <Container fluid>
                        {/* <Row>
                <img src={Bookcases} alt="displayimg"></img>
            </Row> */}
                        <Row>
                            {filteredData.map(book => (

                                <Col xs={3} style={{ paddingBottom: "20px" }}>
                                    <Card >
                                        {/* <Card.Img variant="top" src={book.productImage+"/190px280"} /> */}
                                        <img style={{ paddingLeft: "10px" }} src={"../images/" + book.productImage} width="170px" height="250px"></img>
                                        {/* keep image size horizontal 190 px */}
                                        <Card.Body>
                                            <Link to={"/Description/" + book.productId} style={{ textDecorationLine: "none" }}>
                                                <Card.Title><b>{book.productName}</b></Card.Title>
                                            </Link>
                                            {tran=='p'?
                                            (<div style={{ paddingLeft: "0px" }} >
                                                  <Card.Title><Button variant="primary" onClick={() => { submitHandler(book.productId) }} >Add to Cart</Button></Card.Title>
                                              </div>):(<div style={{ paddingLeft: "15px" }} className="mx-auto">
                                                <Button variant="primary" href={"/Description/" + book.productId}>Rent</Button>
                                              </div>)}
                                                
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    </Container>
                </h2></Col>
            </Row>
        </Container></>
    );
}





export default Library;