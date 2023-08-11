import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios"
import Modal from './Modal/Modal'
import { Link } from "react-router-dom";
import './Daschboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './contact.css'
const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [user, setUser] = useState({});
    const handleModalOpen = (_id) => {
        setSelectedId(_id);
        setShowModal(true);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/Post")
            .then((res) => {
                setPosts(res.data);
                setLoaded(true);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }, [loaded]);

    const hundleCount = (comments) => {
        var a = 0
        comments.map((com) => { com._id ? a += 1 : a += 0 })
        return a;
    }

    
    return (
        <div >
            {/* ====================================== bar navigator================ */}
            <div className='nav-bar'>
                <h1>Travel<span className='ecolor' >E</span>x</h1>
                <div className='nav-bar-home'>
                    
                    <a href="/about" style={{color:"white",textDecoration:"none"}}>About</a>
                    <p style={{marginTop:12}}>
                        <button className='btn btn-primary' style={{marginRight:5}}><Link to={'/login'} style={{textDecoration:"none" ,color:"white"  }}>Login</Link></button>
                        <button className='btn btn-primary' ><Link to={'/register'}style={{textDecoration:"none" ,color:"white"}} >Register</Link></button>
                    </p>
                </div>
            </div>
            {/* ======================================== Welcome ===================== */}
            <div>
                <video style={{ width: '100%' , height:'100%'}} loop autoPlay muted><source src='video.mp4' type='video/mp4' /></video>
            </div>
            {/* ===================SHOW POSTS =================================== */}
            <div className='show_posts' >
                {posts.map((post) => (
                    <div className='post' style={{boxShadow:'10px 10px 5px lightblue',marginBottom:'40px',border:'0.5px solid',height:'300px',borderRadius:'5px'}}>
                        <>
                            <img src="camp.jpg" alt="image_post" className='post_image' style={{width:320,height:300}}/>
                        </>
                        <div style={{width:'70%'}}>
                            <div style={{display:'flex',alignItems:'center'}}>
                            <img className='profile-image' name='image' src={user.image} alt="Profile" width={80} />
                            <p>{post.creatorUserName}</p>
                            </div>
                            <p className='pos_style' style={{alignItems:'baseline'}}>
                                <img src="positionlogo.gif" alt="positionlogo" className='position' style={{height:'50px',width:'50px'}} />
                                {post.localisation}
                            </p>
                            <div style={{display:'flex',justifyContent:' space-between'}}>

                                <div style={{display:'flex',justifyContent:'space-evenly',width:'100px'}}>
                                <p>❤ {post.likes}</p>
                                <p>🗨 {hundleCount(post.comments)} </p></div>
                                <a href="#" onClick={() => handleModalOpen(post._id)}>
                                    More Detail
                                </a>
                                {/* ************Render the modal if showModal is true************ */}
                               {showModal && (
                                    <Modal _id={post._id} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="contact-container">
      <div className="contact-methodd"> 
     <h3>Thank you for visiting our travel experience website!</h3> 
     <p>If you have any questions, feedback, or need assistance, please don't hesitate to get in touch with us. Our dedicated team is here to help and ensure you have an unforgettable travel experience. You can reach us through the following methods:</p></div>
      <h1>Contact Us</h1>
      <div className="contact-method">
        <img src="phone.png" alt="Phone Icon" className="phone-icon" />
        <p style={{textAlign:"center"}}>Call us at: <a href="#" className="twitter-link">+216 54478934</a></p>
      </div>
      <div className="contact-method">
        <img src="img.png" alt="Email Icon" className="email-icon" />
        <p style={{textAlign:"center"}}>Email us at: <a href="#" className="twitter-link">contact@travelexperience.com</a></p>
      </div>
      <div className="contact-method">

          <img src="tweeter.jpeg" alt="Twitter Logo" className="twitter-logo" />
          <p style={{textAlign:"center"}}>Follow us on Twitter: <a href="#" target="_blank" className="twitter-link">@TravelExperience</a></p>

      </div></div>


        </div>

    );
};



export default HomePage