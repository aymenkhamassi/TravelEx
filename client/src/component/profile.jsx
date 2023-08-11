// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate, useParams} from 'react-router-dom';
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import CardHeader from "@material-ui/core/CardHeader";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import { MDBCol, MDBCardImage } from 'mdb-react-ui-kit';
// import { format } from 'date-fns';
// // import './Profile.css';
// import "bootstrap/dist/css/bootstrap.css";
// // import AddPost from './addPost';
// // import {userByIdRoute } from "../utils/APIRoutes";

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [post, setPost] = useState([]);
//   const initialLikes = JSON.parse(localStorage.getItem('likes')) || {};
//   const [likes, setLikes] = useState(initialLikes);
//   const [currentUser, setCurrentUser] = useState(undefined);
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     const checkUserLogin = async () => {
//       const loggedInUser = JSON.parse(localStorage.getItem('userLogedIn'));
//       if (!loggedInUser) {
//         navigate('/login');
//       } else {
//         setCurrentUser(loggedInUser);
//         setIsLoaded(true);
//       }
//     };
//     checkUserLogin();
//   }, [navigate]);


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Send a request to the server to fetch user data
//         const response = await axios.get("http://localhost:8000/api/getLoggedInUser", {
//           withCredentials: true, // Ensure that cookies are sent along with the request
//         });

//         setUser(response.data); // Set the user data in state
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);
  
//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/User/${id}`)
//       .then(res => {
//         setUser(res.data);
//       })
//       .catch(err => console.log(err));
//   }, [id]);

//   const [userLikedPosts, setUserLikedPosts] = useState(() => {
//     const storedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
//     return storedLikedPosts[user._id] || {};
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/Post`)
//       .then(res => {
//         setPost(res.data);
//       })
//       .catch(err => console.log(err));
//   }, [id]);

//   const Logout = () => {
//     navigate('/');
//   };

  
//   // *LIKES

//   const incrementLikes = (postId) => {
//     // Check if the post has already been liked by the user
//     if (!userLikedPosts[postId]) {
//       // Increment the likes count for the post
//       setLikes((prevLikes) => ({
//         ...prevLikes,
//         [postId]: (prevLikes[postId] || 0) + 1,
//       }));
//       setUserLikedPosts((prevLikedPosts) => ({
//         ...prevLikedPosts,
//         [postId]: true,
//       }));

//       // Save the updated liked posts in the local storage
//       localStorage.setItem('likedPosts', JSON.stringify({
//         ...userLikedPosts,
//         [user._id]: {
//           ...userLikedPosts[user._id],
//           [postId]: true,
//         },
//       }));
//     }
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
// const isCurrentUserProfile = currentUser && currentUser._id === user._id
// console.log('currentUser._id:', currentUser._id);
// console.log('user._id:', user._id);
// console.log('isCurrentUserProfile:', isCurrentUserProfile);
  
// // *******************!DELETE POST
//   const deletePost = (id) => {
//     axios.delete(`http://localhost:8000/api/Post/${id}`)
//       .then(res => {
//         console.log("Post deleted ✅✅", res.data);
//         setPost(post.filter((post) => post._id !== id));
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className='containerr'>
//       <Link to={`/homePage`}>⬅</Link>
//       <div className="profile-header">  
//         {user.image && (
//           <div>
//             <img className='profile-header-image' name='image1' src={user.image1} alt="Header" /><br />
//             <img className='profile-image' name='image' src={user.image} alt="Profile" />
//           </div>
//         )}
//       </div>
//       <div className='profile-name'>
//         <p>{user.firstName} {user.lastName}</p>
//         <br />
//         <h5 className='bio'>{user.bio}</h5>

//         <Button
//           className="menuButton"
//           aria-controls="simple-menu"
//           aria-haspopup="true"
//           onClick={handleClick}
//         >
//           <img src="https://cdn0.iconfinder.com/data/icons/cloud-application/500/cloud-65-512.png" alt="show more" width={80} />
//         </Button>
//         <Menu
//           id="simple-menu"
//           anchorEl={anchorEl}
//           keepMounted
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
            
//           <MenuItem onClick={handleClose}>
//            {isCurrentUserProfile && ( <Link to={`/User/${currentUser._id}/edit`}>Edit Profile</Link>)}
//           </MenuItem>
//           <MenuItem onClick={handleClose}>
//           {isCurrentUserProfile && ( <button className="btn btn-danger m-3 p-2" onClick={Logout}>LOGOUT</button>)}
//           </MenuItem>
//           <MenuItem onClick={handleClose}>
//           {isCurrentUserProfile && ( <Link to={`/User/${currentUser._id}/delete`}>Delete Account</Link>)}
//           </MenuItem>
//         </Menu>
//       </div>
//       <br />
//       {/* <AddPost /> */}
//       {post !== null ? (
//         <ul>
//           {post.map(post => (
//             <div key={post._id}>
//               <CardHeader
//                 avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe" />}
//                 action={<IconButton aria-label="settings"></IconButton>}
//                 title={post.creatorFirstName}
//                 subheader={format(new Date(post.createdAt), 'dd/MM/yyyy')}
//               />
//               <p>{post.type}</p>
//               <p>{post.rating}</p>
//               <p>{post.content}</p>
//               <MDBCol className="mb-2">
//                             <MDBCardImage src={post.image}
//                               alt={post._id} className="w-80 rounded-3" />
//                           </MDBCol>
//               <p>{post.localisation}</p>
//               <div>
        
//         <button onClick={() => incrementLikes(post._id)}>💜</button>{likes[post._id] || 0}
//       </div>
//       {isCurrentUserProfile && (
//       <Link to={`/Post/${post._id}/edit`}><button className='btn btn-info'>Edit</button></Link>)}
//             {isCurrentUserProfile && (<button onClick={() => deletePost(post._id)} className='btn btn-danger'>delete</button>)}
        
//               <hr />
              
//             </div>
//           ))}
//         </ul>
//       ) : (
//         <p className='noPosts'> {user.firstname} has no posts yet</p>
//       )}
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams , useLocation} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { MDBCol, MDBCardImage } from 'mdb-react-ui-kit';
import { format } from 'date-fns';
import './profile.css';
import "bootstrap/dist/css/bootstrap.css";
// import AddPost from './addPost';

const Profile = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [creator, setCreator] = useState('');
  const [creatorUserName, setCreatorUserName] = useState('')
  const [likes, setLikes] = useState(0);
  const [idx, setIdx] = useState(0)
//   useEffect(() => {
//     const checkUserLogin = async () => {
//       const loggedInUser = JSON.parse(localStorage.getItem('userLogedIn'));
//       if (!loggedInUser) {
//         navigate('/login');
//       } else {
//         setCurrentUser(loggedInUser);
//         setIsLoaded(true);
//       }
//     };
//     checkUserLogin();
//   }, [navigate]);

  
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
}
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
  useEffect(() => {
    axios.get(`http://localhost:8000/api/User/${id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const [userLikedPosts, setUserLikedPosts] = useState(() => {
    const storedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
    return storedLikedPosts[user._id] || {};
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/Post`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const Logout = () => {
    nav('/');
  };


  // *LIKES

  const incrementLikes = (postId) => {
    // Check if the post has already been liked by the user
    if (!userLikedPosts[postId]) {
      // Increment the likes count for the post
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: (prevLikes[postId] || 0) + 1,
      }));
      setUserLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [postId]: true,
      }));

      // Save the updated liked posts in the local storage
      localStorage.setItem('likedPosts', JSON.stringify({
        ...userLikedPosts,
        [user._id]: {
          ...userLikedPosts[user._id],
          [postId]: true,
        },
      }));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
// *******************!DELETE POST
  const deletePost = (id) => {
    axios.delete(`http://localhost:8000/api/Post/${id}`)
      .then(res => {
        console.log("Post deleted ✅✅", res.data);
        setPost(post.filter((post) => post._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='containerr'>
      <Link to={`/travelex`}>⬅</Link>
      <div className="profile-header">  
        {user.image && (
          <div>
            <img className='profile-header-image' name='image1' src={user.image1} alt="Header"/><br />
            <img className='profile-image' name='image' src={user.image} alt="Profile" width={80}/>
          </div>
        )}
      </div>
      <div className='profile-name'>
        <p>{user.firstName} {user.lastName}</p>
        <br />
        <h5 className='bio'>{user.bio}</h5>

        <Button
          className="menuButton"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <img src="https://cdn0.iconfinder.com/data/icons/cloud-application/500/cloud-65-512.png" alt="show more" width={80} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to={`/User/${user._id}/edit`}>Edit Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <button className="btn btn-danger m-3 p-2" onClick={Logout}>LOGOUT</button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={`/User/${user._id}/delete`}>Delete Account</Link>
          </MenuItem>
        </Menu>
      </div>
      <br />
      <div className='add_post' style={{ marginBottom: '40px' }}>
        <button style={{ backgroundColor: 'blue' }}><Link to={'/addpost'} style={{ color: 'white', textDecoration: 'none' }}>Add Your Posts Here</Link></button></div>
      {post !== null ? (
        <ul>
          {post.map(post => (
            <div key={post._id}>
              <CardHeader
                avatar={<img className='profile-image' name='image' src={user.image} alt="Profile" width={60}/>}
                action={<IconButton aria-label="settings"></IconButton>}
                title={post.creatorUserName}
                subheader={format(new Date(post.createdAt), 'dd/MM/yyyy')}
              />
              <p>{post.type}</p>
              <p>{post.rating}</p>
              <p>{post.content}</p>
              <MDBCol className="mb-2">
                            <MDBCardImage src={post.image}
                              alt={post._id} className="w-80 rounded-3" />
                          </MDBCol>
              <p>{post.localisation}</p>
              <div>
        
        <button onClick={() => incrementLikes(post._id)}>💜</button>{likes[post._id] || 0}
      </div>
      <Link to={`/Post/${post._id}/edit`}><button className='btn btn-info'>Edit</button></Link>
              <button onClick={() => deletePost(post._id)} className='btn btn-danger'>delete</button>
              
              <hr />
            </div>
          ))}
        </ul>
      ) : (
        <p className='noPosts'> {user.firstname} has no posts yet</p>
      )}
    </div>
  );
};

export default Profile;





