import React, { useState } from 'react'
import '../Components/Signup.css'
import { Link, json } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
export default function Signup () {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const registerHandler = async () => {
    if(!name || ! email || !phone || !password){
      alert("All the fields are required")
    }else{
      try {
        const data = {
          name: name,
          email: email,
          phone: phone,
          password: password
        }
        await fetch('http://localhost:8084/auth/create-user', {
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
                if (data.message === 'data already exist') {
                  alert('Email is already exist')
                } else if (data.message === 'User created') {
                  alert('User registration successfull')
                  navigate('/')
                } else {
                  alert('Something went wrong')
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
    <div className='signupMainDiv'>
      <Navbar.Brand href='' className='signupMainName'>
        Event Wallah
      </Navbar.Brand>
      <div className='signupFormDiv'>
        <label className='signupLabel'>Name</label>
        <br />
        <input
          className='signupInput'
          type='text'
          placeholder='Enter your name'
          onChange={e => setName(e.target.value)}
        />
        <br />
        <label className='signupLabel'>Email</label>
        <br />
        <input
          className='signupInput'
          type='email'
          placeholder='Enter your email'
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <label className='signupLabel'>phone</label>
        <br />
        <input
          className='signupInput'
          type='text'
          placeholder='Enter your phone number'
          onChange={e => setPhone(e.target.value)}
        />
        <br />
        <label className='signupLabel'>Password</label>
        <br />
        <input
          className='signupInput'
          type='text'
          placeholder='Enter your password'
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type='Submit' className='btnSubmit' onClick={registerHandler}>
          Register
        </button>
        <br />
        <label className='signupLabel'>I do not have an account</label>
        <br />
        <Link to='/' style={{ color: 'yellow' }}>
          Login
        </Link>
      </div>
    </div>
  )
}
