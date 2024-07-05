import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState(false)


  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({      // if we have an object to be updated, we have to use '()' after '=>' otherwise we normally use {} to execute a block of code after '=>'
      ...prevState,                    // ...prevState ensures that all existing properties in prevState are copied into the new object.
      [e.target.name]: e.target.value  // Using the [] syntax allows you to dynamically set the property name based on e.target.name.  Without the [], JavaScript would treat the property name literally as `e.target.name` which is not a property of the object, not as the value of e.target.name which is actually dynamic property changes based on the user input.
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()         // prevents page from reloading
    
    try {
      const url = '/api/users/login';
      const res = await axios.post(url, formData);
      localStorage.setItem('token', res.data.token);  //No JSON.stringify: The token is stored and retrieved as a plain string, maintaining its intended format. Otherwise the token would be "your_jwt_token_here" and when you try to get the goals with this token, it would give you an error as -  676466266492 and "676466266492"  are two different things and when the string token goes to backend, the protect function couldn't resolve it.
      // console.log(res.data.token);
      navigate('/');
    } catch (error) {
      // console.log(error.response.data);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
    setFormData({
      email: '',
      password: ''
    })
  }
  
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>
      <div style={{ height: '1.5rem', marginBottom: '0.6rem' }}>
        {errorMessage && <div style={{ color: 'red', textAlign: 'center', backgroundColor: 'pink' }}>{errorMessage}</div>}
      </div>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'><input type="email"  required className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} /></div>
          <div className='form-group'><input type="password" required className='form-control' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} /></div>
          <div className='form-group'><button className='btn btn-block' type='submit'>Submit</button></div>
        </form>
      </section>
    </>
  )
}
export default Login