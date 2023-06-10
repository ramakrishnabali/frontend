import { useState } from "react"
 import { Link } from "react-router-dom"

import {v4} from "uuid"

import "./index.css"

const Home =()=>{
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [taskList,setTaskList] = useState([])

    const getTitle = (event)=>{
        setTitle(event.target.value)
    }

    const getDescription =(event)=>{
        setDescription(event.target.value)
    }

    const getUserInput = (event)=>{
        event.preventDefault()

        const newTask = {
            id:v4(),
            title,
            description
        }
        setTaskList(prevState => [newTask,...prevState])
        setTitle("")
        setDescription("")
        
    }

    
     console.log(taskList)

return(
    <div className="todos-bg-container">
        <form className="form-container" onSubmit={getUserInput}>
        <h1 className="create-task-heading">
             Create <span className="create-task-heading-subpart">Task</span>
        </h1>
        <label htmlFor="todoUserInput" className="label">Title</label>
        <input onChange={getTitle} value={title} type="text" id="todoUserInput" className="todo-user-input" placeholder="What needs to be done?" />
        <label htmlFor="describe" className="label">Describe</label>
        <textarea onChange={getDescription} value={description} cols={105} rows={10} id="describe" className="describe" placeholder="Type here......"/>
        <button type="submit" className="button" id="addTodoButton">Create</button>
        </form>
        <h1 className="todo-items-heading">
            My <span className="todo-items-heading-subpart">Tasks</span>
        </h1>
        <ul className="todo-items-container">
            {taskList.map(eachTask =>{
                const {id,title,description} = eachTask
                
                return(
                    <Link to={`/task/${id}`} className="link-item">
                    <li className="todo-item" key={eachTask.id}>
                        <h1 className="todo-heading">{title}</h1>
                        <p>{description}</p>
                    </li>
                    </Link>
                )
            })}
        </ul>
    </div>
)}

export default Home