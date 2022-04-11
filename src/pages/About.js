import React from 'react';

import deep from './deep.jpg';
import akanksha from './akanksha.jpg';
import Navigationbar from './Navigationbar';



function About(){
    
    return (
        <><Navigationbar/>
        <section className="about" id="about">
            <div className="container">
                <div className="heading text-center">
                    <h2>About
                        <span>Us</span></h2>
                    <p>We are BookWorm.com
                        <br/>
                        A platform to enhance the reading glance!!!
                    </p>
                </div>
                <div className="row">
                    {/* <div className="col-4">
                        <img src="https://i.ibb.co/qpz1hvM/About-us.jpg" alt="about" className="img-fluid" width="100%"/>
                    </div> */}
                    <div className="col-8 signup-form4">
                        <h3>SPECIALLY CURATED LEARNING EXPERIENCES FOR KIDS & ADULTS </h3>
                        <p>We curate a set of learning experiences across creative & intellectual pursuits by partnering with the best in the business. We bring these learning experiences to communities around BookWorm libraries</p>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>
                                    <i className="far fa-star"></i>Great learning</h4>
                            </div>
                            <div className="col-md-6">
                                <h4>
                                    <i className="far fa-star"></i>
                                    Creative Minds</h4>
                            </div>
                            <div className="col-md-6">
                                <h4>
                                    <i className="far fa-star"></i>Reading & Libraries</h4>
                            </div>
                            <div className="col-md-6">
                                <h4>
                                    <i className="far fa-star"></i>
                                    Inspire Online</h4>
                            </div>
                            <div className="col-md-6">
                                <h4>
                                    <i className="far fa-star"></i>Reading Recommendations</h4>
                            </div>
                            <div className="col-md-6">
                                <h4>
                                    <i className="far fa-star"></i>
                                    Speed And Flexibility</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        <br/>
        <br/>
        <div className="title">
            
            
            <h2>&nbsp;&nbsp;The creative crew</h2>
        </div>
        <div className="content">
            <h3>&nbsp;&nbsp;Who we are :</h3>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;We are team of creatively diverse. driven. innovative individuals working in various locations from the world.</p>
        </div>
    

    <main>

        <div className="profile">
            <figure data-value="Team Leader">
                <img height="250px" width="180px" src="https://vetri-suriya.web.app/devchallenges/team-page/photo1.png" alt=""/>
                <figcaption>Ajinkya Kangutkar</figcaption>
            </figure>
        </div>

        <div className="profile">
            <figure data-value="Team Member">
                <img height="250px" width="180px" src={akanksha} alt=""/>
                <figcaption>Akanksha Shinde</figcaption>

            </figure>
        </div>

        <div className="profile">
            <figure data-value="Team Member">
                <img height="250px" width="180px" src={deep} alt=""/>
                <figcaption>Ratnadeep Kamble</figcaption>
            </figure>
        </div>

        <div className="profile">
            <figure data-value="Team Member">
                <img height="250px" width="180px" src="https://vetri-suriya.web.app/devchallenges/team-page/photo4.png" alt=""/>
                <figcaption>Suhrud Mhatre</figcaption>
            </figure>
        </div>

        <div className="profile">
            <figure data-value="Team Member">
                <img height="250px" width="180px" src="https://vetri-suriya.web.app/devchallenges/team-page/photo5.png" alt=""/>
                <figcaption>Omkar Raut</figcaption>
            </figure>
        </div>

        <div className="profile">
            <figure data-value="Team Member">
                <img height="250px" width="180px" src="https://vetri-suriya.web.app/devchallenges/team-page/photo6.png" alt=""/>
                <figcaption>Abhijit Patil</figcaption>
            </figure>
        </div>

    </main>

    </section></>
    );
};
export default About;