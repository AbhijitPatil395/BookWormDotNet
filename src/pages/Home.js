import React from "react";
import {Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Navigationbar from "./Navigationbar";

function Home() 
{
    const roleId=sessionStorage.getItem("RoleId");
    const uid=sessionStorage.getItem("UserId");
    return (
        <><Navigationbar/>
        <Container fluid>
        <div>
            <Row>
                <Col >
                    <h2 style={{fontSize: '50px',textAlign: 'center' , paddingTop:"40px"}}>Start Reading At India's Own Online Library</h2>
                    <img src="../images/openbook.JPG">
                    </img>
                    <h6 style={{textAlign: 'center',padding:"40px"}}>click the below button to see what surprises we have in <br></br>store for you</h6>
                </Col>
                {/* jhh */}
            </Row>

                <Row>
                    <Col style={{paddingBottom:"66px"}}>
                        {(roleId==2)? <Link to={"/PublisherProduct/"+uid}> <Button variant="primary" style={{align:'center',fontSize:"17px"}}>Your Listings {'>'}</Button></Link>
                        :<Link to="/Library"> <Button variant="primary" style={{align:'center',fontSize:"17px"}}>Explore Store {'>'}</Button></Link>}
                    
                    </Col>
                    
                </Row>
        </div>
        </Container></>
    );
}




export default Home;