import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [errorMessage, setErrorMessage] = useState(false)

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({      // if we have an object to be updated, we have to use '()' after '=>' otherwise we normally use {} to execute a block of code after '=>'
      ...prevState,                    // ...prevState ensures that all existing properties in prevState are copied into the new object.
      [e.target.name]: e.target.value  // Using the [] syntax allows you to dynamically set the property name based on e.target.name.  Without the [], JavaScript would treat the property name literally as `e.target.name` which is not a property of the object, not as the value of e.target.name which is actually dynamic property changes based on the user input.
    }))
  }

  const navigate = useNavigate()
  const register = async () => {
    try {
      const url = '/api/users';
      const res = await axios.post(url, {name, email, password});
      localStorage.setItem('token', res.data.token);    // creates a token in local storage (web browser)
      navigate('/');
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: ''
    })

  }

  const onSubmit = (e) => {
    e.preventDefault()         // prevents page from reloading
    password !== password2 ? alert('Passwords do not match') : register()
  }


  
  return (
    <>
    <section className='heading'>
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>
      <div style={{ height: '1.5rem', marginBottom: '0.6rem' }}>
    {errorMessage && <div style={{color: 'red', textAlign: 'center', backgroundColor: 'pink'}}>{errorMessage}</div>}
    </div>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'><input required type="text" className='form-control' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}/></div>
          <div className='form-group'><input required type="email" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} /></div>
          <div className='form-group'><input required type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} /></div>
          <div className='form-group'><input required type="password" className='form-control' id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange} /></div>
        <div className='form-group'><button className='btn btn-block' type='submit'>Submit</button></div>
      </form>
    </section>
    </>
  )
}
export default Register