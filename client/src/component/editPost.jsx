

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const nav = useNavigate();
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState(""); 
  const [localisation, setLocal] = useState(""); 

  useEffect(() => {
    axios.get(`http://localhost:8000/api/Post/${id}`)
      .then(res => {
        setPost(res.data);
        setType(res.data.type);
        setRating(res.data.rating);
        setContent(res.data.content); 
        setLocal(res.data.localisation);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    formData.append('type', type);
    formData.append('content', content); 
    formData.append('rating', rating);
    formData.append('localisation', localisation);
    formData.append('image', selectedImage);
    updatePost(formData);
  };

  const updatePost = (formData) => {
    axios.put(`http://localhost:8000/api/Post/${id}/post`, formData)
      .then((res) => {
        console.log(res.data, "success");
        nav(`/User/${id}`);
      })
      .catch((err) => {
        setErrors(err.message);
      });
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const flex = {
    display: 'flex',
  };

  return (
    <div className='container'>
      <Link to={`/homePage`}>Home</Link>
      <div style={flex}>
        <form onSubmit={handleSubmit}>
          <h3>Create a new post</h3>
          <label>Travel Type:</label>
          <select name="travel" onChange={(e) => setType(e.target.value)} value={type}>
            <option value="Luxury">Luxury</option>
            <option value="Camping">Camping</option>
            <option value="Guest House">Guest house</option>
          </select><br />
          <label>Rate your Experience:</label>
          <input
            type="number"
            min={0}
            max={5}
            onChange={(e) => setRating(Number(e.target.value))}
            value={rating}
          /> <br />
          <label>Write your experience here :</label><br />
          <textarea
            name="experience"
            rows="10"
            cols="50"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          /> <br />
          <label>Localisation</label>
                <input type="text" name='localisation' onChange={(e) => setLocal(e.target.value)} value={localisation} />
          <br />
          <input onChange={handleImageChange} type="file" name="image" /><br />
          <button type="submit" className="btn btn-success">Confirm Edit</button>
          <Link type="button" className="btn btn-primary" to={`/User/${user._id}`}>Cancel</Link>
        </form>
        <div className="img">
          {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="img" />}
          {!selectedImage && post.image && <img src={post.image} alt="img" />}
        </div>
      </div>

    </div>
  );
};

export default EditPost;
