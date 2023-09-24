import React,{useState} from 'react'
import '../Components/Signin.css'
import {Link,useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
export default function Signin () {
 

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signinHandler = async () => {
    if(! email || !password){
      alert("All the fields are required")
    }else{
      try {
        const data = {
          email: email,
          password: password
        }
        await fetch('http://localhost:8084/auth/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => {
            res
              .json()
              .then(data => {
                console.log('data------>', data)
                if (data.message === 'User not found') {
                  alert('User not found')
                } else if (data.message === 'data accessible') {
                  navigate('/record')
                }  else if(data.message==="password does not match"){
                  alert('password is not matching')
                }else{
                  alert("Something is  wrong")
                }
              })
              .catch(err => {
                console.log('data error----->', err)
              })
          })
          .catch(err => {
            console.log('response error---->', err)
          })
      } catch (err) {
        console.log('catch error---->', err)
      }
    }
  }

  return (
    <div className='signinMainDiv'>
       <Navbar.Brand href='' className='signinMainName'>Event Wallah</Navbar.Brand>
      <div className='signinFormDiv'>
      <label className='signinLabel'>Email</label><br />
      <input className='signinInput' type="text" placeholder='Enter your email' onChange={e=>setEmail(e.target.value)}/><br/>
      <label className='signinLabel'>Password</label><br/>
      <input className='signinInput' type="text" placeholder='Enter your password' onChange={e=>setPassword(e.target.value)}/><br/>
      <button type='Submit'  onClick={signinHandler} className='btnSubmit'>Login</button><br />
      <label className='signinLabel' >I do not have an account</label><br />
      <Link to='/register' style={{color:"yellow"}}>Register</Link>
      </div>
    </div>
  )
}
