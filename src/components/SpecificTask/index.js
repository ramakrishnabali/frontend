import { useState,useEffect } from "react"
 import { useParams,useNavigate  } from "react-router-dom"

import "./index.css"

const SpecificTask = ()=>{
    const {id} = useParams()
    let navigate = useNavigate();
    const [isUpdataed,setUpdate] = useState(true)
    const [title,setTitle] = useState("")
    const [about,setDescription] = useState("")
    const [todoList , setTodo]= useState({})

    useEffect(()=>{
        const todo = async ()=>{
       const todoApi = `http://localhost:3001/task/${id}`

       const options = {
        method:"GET"
       }

       const todoResponse = await fetch(todoApi,options)
       if (todoResponse.ok){
        const todoData = await todoResponse.json()
        setTodo(...todoData.success)
       }   
    }

        todo() 
    }, []) 


    const getTitle = (event)=>{
        setTitle(event.target.value)
    }

    const getDescription =(event)=>{
        setDescription(event.target.value)
    }

    const getUserInput = (event)=>{
        event.preventDefault()
        const updatedTodo ={
            id,
            title,
            about
        }

        const updateData = async ()=>{
            const updateApi = `http://localhost:3001/task/${id}`
            const options={
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                     "Accept":"application/json"},
                body:JSON.stringify(updatedTodo)
            }

            const updatedResponse = await fetch(updateApi,options)
            if (updatedResponse.ok){
                setTodo(updatedTodo)
                setUpdate(prevState => !prevState)
            }
        }
        updateData()    
    }

    const updateTheTask = ()=>{
        const {title,about} = todoList
        setTitle(title)
        setDescription(about)
        setUpdate(prevState => !prevState)
    }

    const deleteTheTask = ()=>{
        const deleteData = async ()=>{
            const deleteApi = `http://localhost:3001/task/${id}`
            const options ={
                method:"DELETE"
            }
            const deleteResponse = await fetch(deleteApi,options)
            if (deleteResponse.ok){
                navigate("/")
            }   
    }
        deleteData()
    }

    const navigateToHome = ()=>{
        navigate("/")
    }

    return(
        <div  className="todos-container">
            {isUpdataed ?
            (<>
            <h1>{todoList.title}</h1>
            <p>{todoList.about}</p>
            <div>
                <button onClick={updateTheTask} className="update-button" type="button">
                    UPDATE
                </button>
                <button onClick={deleteTheTask} className="delete-button" type="button">
                    DELETE
                </button>
                <button type="button" className="back-button" onClick={navigateToHome}>Back</button>
            </div>
            </>):
            (
            <form className="form-container" onSubmit={getUserInput}>
            <label htmlFor="todoUserInput" className="label">Title</label>
            <input onChange={getTitle} value={title} type="text" id="todoUserInput" className="todo-user-input" placeholder="What needs to be done?" />
            <label htmlFor="describe" className="label">Describe</label>
            <textarea onChange={getDescription} value={about} cols={105} rows={10} id="describe" className="describe" placeholder="Type here......"/>
            <button type="submit" className="button" id="addTodoButton">submit</button>
            </form>
        )
        }
        </div>
    )
}
export default SpecificTask 