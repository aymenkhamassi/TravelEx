import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const nav = useNavigate();
  const [errors, setErrors] = useState({});
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedHeaderImage, setSelectedHeaderImage] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:8000/api/User/${id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Perform password confirmation check
    if (user.password !== passwordConfirmation) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    const formData = new FormData();
    formData.append('firstname', user.firstName);
    formData.append('lastname', user.lastName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('image', selectedImage);
    formData.append('image1', selectedHeaderImage);
    formData.append('bio', user.bio);
    updateUser(formData);
  };

  const updateUser = (formData) => {
    axios.put(`http://localhost:8000/api/User/${id}/edit`, formData)
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

  const handleHeaderImageChange = (event) => {
    setSelectedHeaderImage(event.target.files[0]);
  };
  
  const flex = {
    display: 'flex',
  };

  const Logout = () => {
    nav("/");
  };



  return (
    <div className='container'>
      <Link to={`/homePage`}>Home</Link>
      <h1>Travel<span className='ecolor' >E</span>x</h1>
      <button className="btn btn-danger m-3 p-2" onClick={Logout}>LOGOUT</button>
      <div style={flex}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className='form-label'>First Name:</label>
            <input type="text" name='firstName' onChange={(e) => setUser({ ...user, firstName: e.target.value })} value={user.firstName} />
            {errors.firstName ? <p className='text-danger'>{errors.firstName.message}</p> : ''}
          </div>
          <div className="mb-3">
            <label className='form-label'>Last Name:</label>
            <input type="text" onChange={(e) => setUser({ ...user, lastName: e.target.value })} value={user.lastName} />
            {errors.lastName ? <p className='text-danger'>{errors.lastname.message}</p> : ''}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label">Bio</label>
            <textarea name="bio"  cols="10" rows="05" onChange={(e) => setUser({...user,bio:e.target.value})} className="form-control" value={user.bio}></textarea>
          </div>
          <div className="mb-3">
            <label className='form-label'>Profile Image:</label>
            <input type="file" name="image" onChange={handleImageChange} />
            {errors.image ? <p className='text-danger'>{errors.image.message}</p> : ''}
          </div>
          <div className="mb-3">
            <label className='form-label'>Header Image:</label>
            <input type="file" name="image1" onChange={handleHeaderImageChange} />
            {errors.image1 ? <p className='text-danger'>{errors.image1.message}</p> : ''}
          </div>
          <div className="mb-3">
            <label className='form-label'>Email:</label>
            <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
            {/* {errors.email ? <p className='text-danger'>{errors.email.message}</p> : ''} */}
          </div>
          <div className="mb-3">
            <label className='form-label'>Password:</label>
            <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} />
            {errors.password ? <p className='text-danger'>{errors.password.message}</p> : ''}
          </div>
          <div className="mb-3">
            <label className='form-label'>Confirm new password:</label>
            <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} />
            {errors.password ? <p className='text-danger'>{errors.password}</p> : ''}
          </div>
          <button className="btn btn-primary">Confirm Edit</button>
        </form>
        <div className="img">
          {selectedHeaderImage && <img className='profile-header' src={URL.createObjectURL(selectedHeaderImage)} alt="Header" />}
          {!selectedHeaderImage && user.image1 && <img className='profile-header' src={user.image1} alt="Header" width={500}/>} <br />
          {selectedImage && <img className='profile-image' src={URL.createObjectURL(selectedImage)} alt="Profile" />}
          {!selectedImage && user.image && <img className='profile-image' src={user.image} alt="Profile" width={80}/>}
        </div>
      </div>

      <Link className="btn btn-danger" to={`/User/${user._id}/delete`}>Delete Account</Link>

    </div>
  );
};

export default EditProfile;

