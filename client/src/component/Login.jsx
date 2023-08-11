import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import './Login.css'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
const Login = () => {
    const navigate = useNavigate()
    const [logedUser, setLogedUser] = useState("")
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({

        login: {
            email: '',
            password: ''
        }

    })

    // handel onChange for login inputs
    const handleLoginChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        // Clear any stale data in local storage before logging in
        localStorage.clear();
      }, []);
    // handel onSubmit for login inputs
    const handleLoginSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users/login', login, { withCredentials: true })
            .then(res => {
                
                const userData = res.data;

                // Save user information to local storage
                localStorage.setItem('user', JSON.stringify(userData));

                console.log("cookie", document.cookie);
                console.log("*****************", logedUser);
                navigate('/travelex');



            })
            .catch(err => {
                console.log("❌❌❌", err.response.data)
                setErrors({
                    ...errors,
                    login: err.response.data

                })
                console.log("Error Login", errors.login)

            })
            .finally(() => {
                setLogin({
                  email: "",
                  password: "",
        
                })});

    }

    return (
        <MDBContainer fluid className="p-3 my-5">
            <MDBRow>
            <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
            <div >
            <h1>Welcome to Travel<span className='ecolor' >E</span>x</h1>
            </div>

                

                <h1 style={{color:'blue'}}> Login </h1>
                <form onSubmit={handleLoginSubmit} >
                    <div className='input-field'  class="row mb-3">
                        {errors.login ? <p style={{ color: "red" }}>{errors.login.error}</p> : null}
                        <label  for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                        <MDBInput wrapperClass='mb-4' type='email' name='email' value={login.email} onChange={handleLoginChange} />
                    </div>
                    <div className='input-field'  class="row mb-3">
                        <label  for="inputEmail3" class="col-sm-2 col-form-label">Password</label>
                        <MDBInput wrapperClass='mb-4' type='password' name='password' value={login.password} onChange={handleLoginChange} />

                    </div>
                    <MDBBtn className="mb-4 w-100" size="lg">Log in</MDBBtn>
                </form>
               
            </MDBCol>
            </MDBRow>
            </MDBContainer>



    )
}

export default Login