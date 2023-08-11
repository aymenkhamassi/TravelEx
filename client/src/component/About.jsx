import React from "react";
import './contact.css'
import './About.css'
import { Link} from 'react-router-dom';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import teamMember1 from "../component/images/me.jpg"; 
import teamMember2 from "../component/images/mhamed.jpg";
import teamMember3 from "../component/images/aymen.jpg";
import teamMember4 from "../component/images/nawfeul.jpg";

const About = props =>{

	const teamMembers = [
		{ id: 1, name: 'Eya Hamdi', photo: teamMember1, description: 'Developer' },
		{ id: 2, name: 'Mhamed Moncer', photo: teamMember2, description: 'Developer' },
		{ id: 3, name: 'Aymen Khamessi', photo: teamMember3, description: 'Scrum Master' },
		{ id: 4, name: 'Nawfel Ben Amor', photo: teamMember4, description: 'Developer' },
	  ];
	
	  const smallerImageStyle = {
		width: '220px',
		height: '300px',
		borderRadius: '8%',
		objectFit: 'cover',
	  };
    return(
		<>
		<Link to={`/travelex`}>⬅</Link>
		<h1>Travel<span className='ecolor' >E</span>x</h1>

		<Row className="justify-content-center mt-5">
		  <Col xs={12} md={8}>
			<Card className="team-section-card p-4">
			  <Row>
				<Col md={6}>
				  <Carousel interval={2000} pause="hover" indicators={false}>
					{teamMembers.map((member) => (
					  <Carousel.Item key={member.id}>
						<Card.Img variant="top" src={member.photo} alt={member.name} style={smallerImageStyle} />
						<Card.Body>
						  <Card.Title className="cardtexte">{member.name}</Card.Title>
						  <Card.Text className="cardtext">{member.description}</Card.Text>
						</Card.Body>
					  </Carousel.Item>
					))}
				  </Carousel>
				</Col>
				<Col md={6} className="d-flex flex-column justify-content-center align-items-center">
				  <div className="title">
					<h3>Our Team</h3>
				  </div>
				  <p className="text-center mt-3">
					Thanks to our dedicated team members for their hard work and commitment we created this website, a space for adventurers to be free.
				  </p>
				</Col>
			  </Row>
			</Card>
		  </Col>
		</Row>

	   <div className="contact-container">
		<div className="contact-methodd"> 
	   <h3>Thank you for visiting our travel experience website!</h3> 
	   <p>If you have any questions, feedback, or need assistance, please don't hesitate to get in touch with us. Our dedicated team is here to help and ensure you have an unforgettable travel experience. You can reach us through the following methods:</p></div>
		<h1>Contact Us</h1>
		<div className="contact-method">
		  <img src="phone.png" alt="Phone Icon" className="phone-icon" />
		  <p>Call us at: <a href="#" className="twitter-link">+216 54478934</a></p>
		</div>
		<div className="contact-method">
		  <img src="img.png" alt="Email Icon" className="email-icon" />
		  <p>Email us at: <a href="#" className="twitter-link">contact@travelexperience.com</a></p>
		</div>
		<div className="contact-method">
		  
			<img src="tweeter.jpeg" alt="Twitter Logo" className="twitter-logo" />
			<p>Follow us on Twitter: <a href="#" target="_blank" className="twitter-link">@TravelExperience</a></p>
		  
		</div></div>
		</>
  
	)
}

export default About