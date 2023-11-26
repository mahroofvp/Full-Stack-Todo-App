import { useEffect, useRef, useState } from 'react'
import { BsTrash, BsPencil } from 'react-icons/bs'
import axios from 'axios';
import './App.css'

const API_URL = "http://localhost:3001/todo"; 

function App() {
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState("")
  const [editId, setEditId] = useState(0)
  
  const fetchTodos = async ()=>{
    try {
      const response = await axios(API_URL)
      const data = response.data
      
        console.log("result ",data);
        setTodos(data)
      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    fetchTodos()
  },[])
 
  // adding new todo

  const newTodoSet = async () => {
    
    if(newTodo){
      try {
        
        const response = await axios(API_URL,{
          method:"POST",
          data:{
            todo:newTodo,
          }
  
        })
       todos.push(response.data)
        
        setNewTodo("")

      } catch (error) {
        console.log(error.response.data.message);
      }

  }
}


// edit todo

const onEdit = (id) => { 
  const toEditItem = todos.find((data) => data._id === id)
  setEditTodo(toEditItem.todo)
  setEditId(toEditItem._id)
}


  const todoReset = async () => {
        
    if(editId){

      try {
        const response = await axios(API_URL,{
          method:"PUT",
          data:{
            todo:editTodo,
            _id:editId,
            status: false,
          }
        })
        const itemIndex = todos.findIndex((data) => data._id == editId)
        todos[itemIndex] = response.data
        
        setTodos(todos)
        console.log(todos);
        
        
        setEditId(0) 
        setEditTodo("")
      } catch (error) {
        console.log(error.response.data.message);
      }

    }
    
 
  }

 
//  delete todo

  const onDelete = async (id) => {
    try {
      const response = await axios(API_URL,{
        method:"DELETE",
        data:{
          _id:id,
        }
      })
      

      const itemRemovedList = todos.filter((data)=> data._id !== id)
      
      setTodos(itemRemovedList)
      
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const handleClick = (id) => {
    const completed = todos.map((val) => {
      if (val._id === id) {
        return ({ ...val, status: !val.status })
      }
      return val;
    })
    setTodos(completed)
  }

  // clear todo input

  const onClear = ()=> {
    setEditTodo("")
    setEditId(0)
  }


  return (

    <div className='todo-main-div'>

      <div className='todo-container-div'>


        <h1>Todo List</h1>
        <div className='adding-input-section'>
          <input type="text" value={newTodo} placeholder='New Todo' onChange={(e) => setNewTodo(e.target.value)} />
          <button onClick={newTodoSet}>ADD TODO</button>
        </div>
        <div className='todo-ul-div'>
          <ul>
            {todos.map((item) => {

              return <li key={item._id}  >
                
                <span className='todo-span' id={`${item.status}`} onClick={() => handleClick(item._id)}>{item.todo} </span>
                <span><BsPencil className='li-icons' id='pen-icon' title='Edit' onClick={() => onEdit(item._id)} /> 
                <BsTrash title='Delete' className='li-icons' id='trash-icon' onClick={() => onDelete(item._id)} />
                </span>
                 </li>
            })}


          </ul>
        </div>

       { editId?  <div className='editing-input-div'>
          <input type="text" value={editTodo} placeholder='Edit Current Todo' onChange={(e) => setEditTodo(e.target.value)} />
          <button id='save-btn'  onClick={editTodo ? todoReset : null}>Save</button>
          
          <button id='cancel-btn' onClick={onClear}>cancel</button>
        </div>: ""
      } 

      </div>
    </div>

  )
}

export default App
