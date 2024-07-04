import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({      // if we have an object to be updated, we have to use '()' after '=>' otherwise we normally use {} to execute a block of code after '=>'
      ...prevState,                    // ...prevState ensures that all existing properties in prevState are copied into the new object.
      [e.target.name]: e.target.value  // Using the [] syntax allows you to dynamically set the property name based on e.target.name.  Without the [], JavaScript would treat the property name literally as `e.target.name` which is not a property of the object, not as the value of e.target.name which is actually dynamic property changes based on the user input.
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()         // prevents page from reloading
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'><input type="text" className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} /></div>
          <div className='form-group'><input type="password" className='form-control' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} /></div>
          <div className='form-group'><button className='btn btn-block' type='submit'>Submit</button></div>
        </form>
      </section>
    </>
  )
}
export default Login