// import React, { useState, useEffect } from "react";
// import { useNavigate ,Link, useParams } from "react-router-dom";
// import axios from "axios"
// import './AddPost.css'


// const AddPost = props => {
//     const [type, setType] = useState()
//     const [content, setContent] = useState()
//     const [rating, setRating] = useState()
//     const [selectedimage, setImage] = useState()
//     const [localisation, setLocal] = useState()
//     const [likes, setLike] = useState()
//     const [post, setPost] = useState({});


//     const [errors, setErrors] = useState([])
//     const [creator, setCreator] = useState('')
//     const [creatorUserName, setCreatorUserName] = useState('')

//     const nav = useNavigate()
//     const {id} = useParams()


//     //!=======================================get user Data from local storage ===========================
//     //note: this part fuction when (https-only ) not existe in back-end
//     const [user, setUser] = useState({});

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 // Send a request to the server to fetch user data
//                 const response = await axios.get("http://localhost:8000/api/getLoggedInUser", {
//                     withCredentials: true, // Ensure that cookies are sent along with the request
//                 });

//                 setUser(response.data); // Set the user data in state
//                 setCreator(response.data._id);
//                 setCreatorUserName(response.data.firstName);
                

//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         };
//             fetchUserData();
            

        
       
    
//     }, []);
//     //!=====================

//     const handleImageChange = (event) => {
//         setImage(event.target.files[0]);
//       };
    
//     // !! Handle the form inputs
//     const createPost = (e) => {
//         e.preventDefault()
//         const newPost = {
//             type,
//             content,
//             rating,
//             image: selectedimage, 
//             localisation,
//             creator,
//             creatorUserName
            

//         }
        
//         console.log(creatorUserName)
//         //  console.log(newNote)
//         // take the object and send it to the server => DB
//         axios.post("http://localhost:8000/api/Post/create", newPost)

//             .then((response) => {
//                 console.log(response.data)
//                 console.log(" ✔✔ client success")
//                 nav("/travelex")
//             })
//             .catch(err => {
//                 console.log((" ✂✂ client error"))
//                 console.log(err.response.data.errors)
//                 const errorResponse = err.response.data.errors;    //!!!  Get the errors from err.response.data
//                 const errorArr = []        //!!!  Define a temp error array  to push message in  
//                 for (const key of Object.keys(errorResponse)) {    //!!  loop throught all errors and get the message 
//                     console.log("=======", key)
//                     errorArr.push(errorResponse[key].message)
//                 }
//                 //!!! set Errors 
//                 setErrors(errorArr)
//             })

//     }

//     return (
//         <div>
           
//             <form onSubmit={(e) => { createPost(e) }}>
//                 <label>Travel Type : </label>
//                 <select name="travel" onChange={(e) => setType(e.target.value)} value={type}>
//                     <option value="luxury">Luxury</option>
//                     <option value="Camping">Camping</option>
//                     <option value="Guest House">Guest house</option>
//                 </select><br />
//                 <label>Rate your Experience :</label>
//                 <input type="Number" onChange={(e) => setRating(e.target.value)} value={rating} /><br />
//                 <label>Write your experience here :</label><br />
//                 <textarea id="experience" name="content" rows="10" cols="50" onChange={(e) => setContent(e.target.value)} value={content} />
//                 <br /><br />
//                 {/* <label>Image</label>
//                 <input type="text" onChange={(e) => setImage(e.target.value)} value={image} /> */}
//             <label className='form-label'>Post Image:</label>
//             <input type="file" name="image" onChange={handleImageChange} />
//                     {selectedimage && <img src={URL.createObjectURL(selectedimage)} alt="Header" width={250} />}
//           {!selectedimage && post.image && <img src={post.image} alt="Header" />} <br />
//                 <label>Localisation</label>
//                 <input type="text" onChange={(e) => setLocal(e.target.value)} value={localisation} />

//                 <button type="submit" className="btn btn-success">POST</button>

//                 <button type="submit" className="btn btn-danger"><Link to = {`/User/${id}`}>Cancel</Link></button>
//             </form>

//         </div>


//     )
// }

// export default AddPost
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AddPost.css";

const AddPost = (props) => {
  const [type, setType] = useState();
  const [content, setContent] = useState();
  const [rating, setRating] = useState();
  const [selectedimage, setImage] = useState();
  const [localisation, setLocal] = useState();
  const [likes, setLike] = useState();
  const [post, setPost] = useState({});

  const [errors, setErrors] = useState([]);
  const [creator, setCreator] = useState("");
  const [creatorUserName, setCreatorUserName] = useState("");

  const nav = useNavigate();
  const { id } = useParams();

  //!=======================================get user Data from local storage ===========================
  //note: this part function when (https-only ) not existing in the back-end
  const [user, setUser] = useState({});

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
  //!=====================

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // !! Handle the form inputs
  const createPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", type);
    formData.append("content", content);
    formData.append("rating", rating);
    formData.append("image", selectedimage);
    formData.append("localisation", localisation);
    formData.append("creator", creator);
    formData.append("creatorUserName", creatorUserName);

    axios
      .post("http://localhost:8000/api/Post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type as multipart/form-data
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log("✔✔ client success");
        nav("/travelex");
      })
      .catch((err) => {
        console.log("✂✂ client error");
        console.log(err.response.data.errors);
        const errorResponse = err.response.data.errors; //!!!  Get the errors from err.response.data
        const errorArr = []; //!!!  Define a temp error array to push message in
        for (const key of Object.keys(errorResponse)) {
          console.log("=======", key);
          errorArr.push(errorResponse[key].message);
        }
        //!!! set Errors
        setErrors(errorArr);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => createPost(e)}>
        <label>Travel Type : </label>
        <select name="travel" onChange={(e) => setType(e.target.value)} value={type}>
          <option value="luxury">Luxury</option>
          <option value="Camping">Camping</option>
          <option value="Guest House">Guest house</option>
        </select>
        <br />
        <label>Rate your Experience :</label>
        <input type="Number" onChange={(e) => setRating(e.target.value)} value={rating} />
        <br />
        <label>Write your experience here :</label>
        <br />
        <textarea
          id="experience"
          name="content"
          rows="10"
          cols="50"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br />
        <br />
        {/* <label>Image</label>
        <input type="text" onChange={(e) => setImage(e.target.value)} value={image} /> */}
        <label className="form-label">Post Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
        {selectedimage && <img src={URL.createObjectURL(selectedimage)} alt="Header" width={250} />}
        {!selectedimage && post.image && <img src={post.image} alt="Header" />} <br />
        <label>Localisation</label>
        <input type="text" onChange={(e) => setLocal(e.target.value)} value={localisation} />

        <button type="submit" className="btn btn-success">
          POST
        </button>

        <button type="submit" className="btn btn-danger">
          <Link to={`/User/${id}`}>Cancel</Link>
        </button>
      </form>
    </div>
  );
};

export default AddPost;
