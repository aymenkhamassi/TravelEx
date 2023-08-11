import React from 'react'
import './Daschboard.css'
import { useEffect, useState } from "react";
import axios from "axios"
import Modal from 'react-modal';
import { Link, useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns';
import CardHeader from "@material-ui/core/CardHeader";
Modal.setAppElement('#root');


const DaschboardUser = (props) => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [idx, setIdx] = useState(0)
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorUserName, setCreatorUserName] = useState('')
  const [comment, setComment] = useState('')
  const { id } = useParams();
  const [user, setUser] = useState({});
  
  
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

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Send a request to the server to fetch user data
      const response = await axios.get("http://localhost:8000/api/getLoggedInUser", {
        withCredentials: true, // Ensure that cookies are sent along with the request
      });

      setUser(response.data); // Set the user data in state
      setCreator(response.data._id);
      setCreatorUserName(response.data.firstName);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
}});

useEffect(() => {
  axios.get(`http://localhost:8000/api/User/${id}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(err => console.log(err));
}, [id]);

  const handleCount = (_id, e, idx) => {

    setIdx(idx + 1)
    if (idx % 2 === 0) {
      axios
        .put(`http://localhost:8000/api/post/${_id}/increment`)
        .then((response) => {
          setLikes(response.data.likes);
        })
        .catch((error) => {
          console.error('Error incrementing likes:', error);
        });
    };

    if (idx % 2 !== 0) {
      axios
        .put(`http://localhost:8000/api/post/${_id}/decrement`)
        .then((response) => {
          setLikes(response.data.likes);
        })
        .catch((error) => {
          console.error('Error decrementing likes:', error);
        });
    }
  }


  const handleModalOpen = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const filteredPosts = selectedType
    ? posts.filter((post) => post.type === selectedType)
    : posts;

  const hundleCountComment = (comments) => {
    var a = 0
    comments.map((com) => { com._id ? a += 1 : a += 0 })

    return a;
  }
  //!=======================================get user Data from local storage ===========================
  //note: this part fuction when (https-only ) not existe in back-end


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Send a request to the server to fetch user data
        const response = await axios.get("http://localhost:8000/api/getLoggedInUser", {
          withCredentials: true, // Ensure that cookies are sent along with the request
        });

        setUser(response.data); // Set the user data in state
        setCreator(response.data._id);
        setCreatorUserName(response.data.firstName);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  //!===================================================================================



  //!==========================================MOdal====================================

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalStates, setModalStates] = useState(null);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customModalStyles = {
    content: {
      width: '50%', // Utilisez une largeur réduite si le modal est minimisé
      height: 'auto',
      margin: 'auto',
      border: '2px solid #000',
      borderRadius: '10px',
      backgroundColor: 'white',




    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Définit la couleur de fond semi-transparente
      zIndex: 1000, // Définit la priorité d'affichage du modal par rapport au contenu en arrière-plan
    },
  };
  //!=============================================================================

  const hundleDisplayPost = (e) => {
    e.preventDefault();
  }

  const hundleSubmit = (e, id) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/Post/comment/' + id, { creator, creatorUserName, comment })
      .then(res => {
        console.log(res)
        setComment(' ')
      })
      .catch(err => {
        console.log("❌❌❌", err.response.data)
      })
  }
  const nav = useNavigate();
  const handleLogout = () => {
    try {
      axios.post('http://localhost:8000/api/users/logout',
        {}, { withCredentials: true })
        .then((serverResponse) => {
          console.log(serverResponse);
        })
      nav("/login");
    } catch (error) {
      console.log(error);

    }
  };
  

  return (
    <div>
      {/* ====================================== bar navigator================ */}
      <div className='nav-bar'>
        <h1 >Travel<span className='ecolor' >E</span>x</h1>
        <div className='nav-bar-home'>
          <a href="/travelex" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          <Dropdown
            trigger={<img className='profile-image' name='image' src={user.image} alt="Profile" width={80} />}
            menu={[
              <Link to={'/User/' + creator} style={{ color: 'blue', textDecoration: 'none' }}>Profile</Link>,
              <a onClick={handleLogout} style={{ color: 'blue', textDecoration: 'none' }}>LogOut</a>,
            ]}
          />
        </div>
      </div>
      {/* ======================================== search bar ===================== */}
      <div className='search_bar' style={{ marginTop: '10px', marginLeft: '10px', marginRight: '20px' }} >
        <div>
          <label>Search : </label>
          <input type="text" placeholder='Tap Your Search Key' />
        </div>
        <div style={{ display: 'flex' }}>
          <label style={{ width: '220px', alignItems: 'self-end' }}>Select Your Type : </label>
          <select name="type" id="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} >
            <option value="">All</option>
            <option value="Luxury">Luxury</option>
            <option value="Camping">Camping</option>
            <option value="Camping">Work</option>
            <option value="Guest House">Guest House</option>
          </select>
        </div>
      </div>

      {/* ===================Add Posts =================================== */}

      <div className='add_post' style={{ marginBottom: '40px' }}>
        <button style={{ backgroundColor: 'blue' }}><Link to={'/addpost'} style={{ color: 'white', textDecoration: 'none' }}>Add Your Posts Here</Link></button>

      </div>
      {/* ===================SHOW POSTS =================================== */}
      <div className="show_posts">
        {filteredPosts.map((post) => {
          return (
            <div className="post" key={post._id} style={{ boxShadow: '10px 10px 5px lightblue', marginBottom: '40px', border: '0.5px solid', height: '300px',borderRadius:'5px' }}>
              <>
                <img src={post.image} alt="image_post" className='post_image' style={{ width: 320, height: 300 }} />

              </>
              <div className='block2'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <img className='profile-image' name='image' src={user.image} alt="Profile" width={80}/>
                <CardHeader
                subheader={format(new Date(post.createdAt), 'dd/MM/yyyy')}/>
                  <p>{post.creatorUserName}</p>
                </div>
                <p className='pos_style' style={{ alignItems: 'baseline' }}>
                  <img src="positionlogo.gif" alt="positionlogo" className='position' style={{ height: '50px', width: '50px' }} />
                  {post.localisation}
                </p>

                <div style={{ display: 'flex', justifyContent: ' space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100px' }}>
                    <a onClick={(e) => handleCount(post._id, e, idx)}>❤ {likes}</a>
                    <p>🗨 {hundleCountComment(post.comments)} </p>
                  </div>
                  <a href="#" onClick={openModal}>

                    More Detail
                  </a>
                </div>
                {/* ************Render the modal if showModal is true************ */}
                <Modal id={post._id} isOpen={modalIsOpen} style={{ ...customModalStyles, content: { ...customModalStyles.content }, }} onRequestClose={closeModal} contentLabel="Example Modal" >
                  <div onChange={hundleDisplayPost} >

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src="photos.jpg" alt="image_user" style={{ borderRadius: "48%", width: 40, height: 40, border: "0.5px solid black", marginTop: 10, marginRight: '20px' }} />
                      <p>{post.creatorUserName}</p>
                    </div>
                    <div style={{ textAlign: "center", marginBottom: "25px" }}>
                      <img src={post.image} alt="image_post" style={{ width: 320, height: 300, borderRadius: "10px" }} />
                    </div>
                    <div >
                      <p style={{ alignItems: 'baseline' }}>
                        <img src="positionlogo.gif" alt="positionlogo" style={{ height: '50px', width: '50px' }}/>
                        {post.localisation}
                      </p>
                      <p>Description : {post.content}</p>
                      <p>❤ {post.likes}</p>
                      <div style={{backgroundColor:'lightgrey',widh:'75%',borderRadius:'5px',padding:'50px',margin:'20px'}}>
                      

                        {/* {post.comments? <p>fff</p>: <p>noooo</p>} */}
                        {post.comments.map((comm) => (
                          <div key={comm._id}>
                            <p>{comm.creatorUserName} : {comm.comment}</p>
                            

                          </div>
                        ))}

                      <form onSubmit={(e) => hundleSubmit(e, post._id)}>
                        <label>Comment </label>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} >

                        </textarea>
                        <button type='submit' style={{borderRadius:'8%'}}>Add</button>
                      </form>
                      </div>
                    </div>
                  </div>
                  <button onClick={closeModal} style={{backgroundColor:'#f8312f',borderRadius:'8%',marginLeft:'45%'}}>Close</button>
                </Modal>

              </div>
            </div>
          )
        })}
      </div>
    </div>

  );
};

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default DaschboardUser