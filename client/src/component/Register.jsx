import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  import './Login.css'
const Reg = () => {
    const navigate = useNavigate()
    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
       
    })
   
    const [errors, setErrors] = useState({
        register: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            
        }

    })
    // handel onChange for register inputs
    const handleRegisterChange = (e) => {
        e.preventDefault();
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }

   
    // handel onSubmit for register inputs
    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/User', register)
            .then(res => {
                console.log(res)
                setRegister({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    
                })
                navigate('/login')
            })
            .catch(err => {
                console.log("❌❌❌", err.response.data)
                setErrors({
                    ...errors,
                    register: err.response.data

                })


            })

    }

    
           

    return (
        <MDBContainer fluid className="p-3 my-5">
            <MDBRow>
              <h1>Welcome To Travel<span className='ecolor' >E</span>x</h1>
         
            <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Phone image" />
        </MDBCol>
            
        <MDBCol col='4' md='6'>
                        <h2 style={{color:'blue'}}>Register</h2>
                        {errors.register ? Object.entries(errors.register).map(([key, value], index) => value ? <p style={{ color: "red" }}>{value.message}</p> : null) : null}
                        <form onSubmit={handleRegisterSubmit} className="col-12" >
                            <div className="mb-3">
                                <label className="form-label"   >First Name</label>
                                <MDBInput wrapperClass='mb-4' type='text' name='firstName' value={register.firstName} onChange={handleRegisterChange} />

                            </div>
                            <div className="mb-3">
                                <label className="form-label"       >Last Name</label>
                                <MDBInput wrapperClass='mb-4' type='text' name='lastName' value={register.lastName} onChange={handleRegisterChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"      >Email</label>
                                <MDBInput wrapperClass='mb-4' type='email' name='email' value={register.email} onChange={handleRegisterChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"       >Password</label>
                                <MDBInput wrapperClass='mb-4' type='password' name='password' value={register.password} onChange={handleRegisterChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"     >Confirm Password</label>
                                <input className="form-control" type='password' name='confirmPassword' value={register.confirmPassword} onChange={handleRegisterChange} />
                            </div>
                           
                            <MDBBtn className="mb-4 w-100" size="lg">Register</MDBBtn>
                        </form>

                        </MDBCol>
</MDBRow>
            </MDBContainer>
    )
}

export default Reg