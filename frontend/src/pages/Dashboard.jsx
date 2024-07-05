import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GoalCard from '../components/GoalCard'

const Dashboard = () => {

  const [goals, setGoals] = useState([])
  const [user, setUser] = useState({})
  const [detailsFetched, setDetailsFetched] = useState(false)
  const [text, setText] = useState('')

  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  
  const getGoals = async () => {
    const response = await axios.get('/api/goals', options)
    setGoals(response.data)
  }
  const getMe = async ()=>{
    const response = await axios.get('/api/users/me', options)
    setUser(response.data)
    setDetailsFetched(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getGoals(), getMe()]);
    };
    fetchData();
  }, []);
  
  // console.log(goals)

  const [message, setMessage] = useState(false)
  const createGoals = async()=>{
    const url = '/api/goals'
    try {
      const res = await axios.post(url, {text: text}, options)
      // console.log(res.data.goal)
      setMessage('Goal created successfully')
      setText('')
      setGoals(prevGoals => [...prevGoals, res.data.goal]); // Update goals state with new goal so that changes can be displayed
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.log('Error while creating goal: ',error)
    }
  }

 /*
 // you can also return another jsx like this
 
 if (!localStorage.getItem('token')) {
    return <h1 style={{ textAlign: 'center', marginTop: '7rem', backgroundColor: 'lightblue', padding: '1rem' }}>
      Please Login to see your dashboard
    </h1>
  }
 */


  return (
    <div>
      <h1>Dashboard</h1>
      {
        localStorage.getItem('token') ? 
      (!detailsFetched ? <h2>Loading...</h2> :  
      <div className='container'>
      <h2 style={{textAlign: 'center', marginBottom: '2rem', marginTop: '2rem', color: 'red'}}>Welcome, {user.name}</h2>
      <div style={{marginBottom: '1rem'}}>
        <h2><u>Create your goal</u></h2>
            <form className='form' onSubmit={(e) => { e.preventDefault(); createGoals();}}>
              <div className='form-group'><input type="text" name='text' id='text' required value={text} onChange={(e)=>{setText(e.target.value)}}/></div>
              <div className='form-group'><button className='btn btn-block'>Add Goal</button></div>
        </form>
      </div>
      <div style={{height: '2rem'}}>
      {
        message && <h2 style={{textAlign: 'center', color: 'green', backgroundColor: 'lightgreen' }}>{message}</h2>
      }
      </div>
        <h2 style={{textAlign: 'center', marginBottom: '2rem', marginTop: '2rem', color: 'blue' }}>Your Goals</h2>
        <div className='goals'>
          {goals.map((goal,index)=>{
            return(
              <GoalCard text={goal.text} id={goal._id} key={index} setGoals={setGoals}/>
            )
          })}
        </div>
      </div>
        )
      : (
        <h1 style={{textAlign: 'center', marginTop: '7rem', backgroundColor: 'lightblue', padding: '1rem'}}>
          Please Login to see your dashboard
        </h1>
      )
      }
    </div>
  )
}

export default Dashboard