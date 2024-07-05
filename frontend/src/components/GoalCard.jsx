import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowRight, FaCross, FaEdit, FaTrash } from 'react-icons/fa'

const GoalCard = ({text, id, setGoals}) => {
  
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  
//Delete
const [deleteMessage, setDeleteMessage] = useState(false)

const handleDelete = async (goalId)=>{
  const url = `/api/goals/${goalId}`
  const res = await axios.delete(url, options)
  setDeleteMessage(res.data.message)
  setTimeout(() => {
    setGoals(prevGoals => prevGoals.filter(goal => goal._id !== goalId)) // Update goals state to remove the deleted goal. And setter functions always carry previous state. here filter method filters out the deleted goal and returns the new array of remaining goals. And since we are changing the state, the component will render and we can see the result.
    // although successfully deleted from the db, we also want to remove it from the UI without hard reloading. So changing state will cause the rendering of the dashboard component.
    setDeleteMessage(false)
  },2000)
}

//Edit
const [edit, setEdit] = useState(false)
const [editText, setEditText] = useState(text)
const [editStatus, setEditStatus] = useState("")

const handleEdit = async (id, text)=>{
  const url = `/api/goals/${id}`
  const res = await axios.put(url, {text: text}, options)
  // console.log(res.data.goal)
  setEdit(prev => !prev)
  setEditText(res.data.goal.text)
  setEditStatus("lightgreen")
  setGoals(prevGoals => prevGoals.map(goal => goal._id === id ? res.data.goal : goal))  // The map function returns a new array where only the edited goal is replaced with its updated version. The setGoals function then updates the state with this new array, effectively reflecting the changes in the UI.
  // although successfully edited in the db, we also want to display the changes in UI without hard reloading. So changing state will cause the rendering of the dashboard component.
  setTimeout(() => {
    setEditStatus("")
  }, 2000)
}



  return (
    <>
  {
    !deleteMessage ?
          (<div className='goal' style={{ display: "flex", justifyContent: "space-around", width: "100%", backgroundColor: editStatus }}>
          {
              edit ? (<input type="text" name='text' value={editText} onChange={(e) => setEditText(e.target.value)}/>) : (<h3>{text}</h3>)
          }
      <div style={{display:"flex", gap:"20px"}}>
      <button style={{ border: "none", cursor: "pointer" }}>
      {edit ?
       <FaCross style={{ color: "red", width: "20px", height: "20px" }} onClick={() => setEdit(prev => !prev)} />
      : 
       <FaTrash style={{ color: "red", width: "20px", height: "20px" }} onClick={() => handleDelete(id)} />
      }
      </button>
      
      <button style={{border:"none",cursor:"pointer"}}>
      {edit ?
      <FaArrowRight style={{ color: "green", width: "20px", height: "20px" }} onClick={() => handleEdit(id, editText)} />
      : 
      <FaEdit style={{ color: "green", width: "20px", height: "20px" }} onClick={() => setEdit(prev => !prev)} />
    }
      </button>
      </div>
      </div>)
  : 
    (<div className='goal' style={{ display: "flex", justifyContent: "space-around", width: "100%", backgroundColor: "pink" }}>
            <h3 style={{color:"red"}}>{deleteMessage}</h3>
          </div>
    )
  }
    </>
  )
}

export default GoalCard



































































/*
const prevGoals = [
  { _id: '1', text: 'Learn React' },
  { _id: '2', text: 'Build a project' },
  { _id: '3', text: 'Get a job' }
];

Suppose you edited the goal with _id: '2' and received the updated goal from the server:
const updatedGoal = { _id: '2', text: 'Build a cool project' };

The map function will transform prevGoals as follows:
const newGoals = prevGoals.map(goal => 
  goal._id === '2' ? updatedGoal : goal
);

Resulting in:
const newGoals = [
  { _id: '1', text: 'Learn React' },
  { _id: '2', text: 'Build a cool project' },
  { _id: '3', text: 'Get a job' }
];

*/