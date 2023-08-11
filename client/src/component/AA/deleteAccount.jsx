import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './DeleteUser.css';


const DeleteUser = () => {

const [user, setUser] = useState({});
const { id } = useParams();
const [passwordConfirmation, setPasswordConfirmation] = useState('');
const nav = useNavigate();
const [errors, setErrors] = useState({});


useEffect(() => {
    // Fetch user data from the API when the component mounts
    axios.get(`http://localhost:8000/api/User/${id}`)
    .then((res) => {
        setUser(res.data); 
    })
    .catch((err) => {
        console.log(err);
    });
  }, [id]);


const deleteUser = () => { axios
    .delete(`http://localhost:8000/api/User/${id}/delete`)
    .then((res) => {
        nav("/");
        console.log(res, "account deleted");
    })
    .catch((err) => {
        console.log(err);
    });
};
const handleSubmit = (e) => {
    e.preventDefault();
    // Perform password confirmation check
    if (passwordConfirmation !== user.password) {
        setErrors({ password: "Wrong Password" });
    } else {
        setErrors({}); // Clear any previous errors
        deleteUser();
    }}
return (
    <div className='containeer'><img src="/Logo.png" alt="logo"  />
    <div className='containere'>
        <form onSubmit={handleSubmit}>
            
        <h1 className="warning-title">WARNING: If you delete this account you can not open it again!!!!</h1>
        <h2>Complete your deactivation request by entering the password associated with your account.</h2>
    
    
        <div className="mb-3">
            <label className='form-label'>Confirm your password :</label>
            <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} />
            {errors.password ? <p className='text-danger'>{errors.password}</p> : ''}
    </div>
    <button onClick={deleteUser} className="delete-btn">Delete Account</button>
    </form>
    </div></div>
);}
export default DeleteUser;