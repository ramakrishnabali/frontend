import { useState } from "react"
// import { Link } from "react-router-dom"

import "./index.css"

const SpecificTask = ()=>{
    const [isUpdataed,setUpdate] = useState(true)
    const [title,setTitle] = useState("I build an todo application")
    const [description,setDescription] = useState("In this we can add whatever we want to do or we are done at past..")

    const getTitle = (event)=>{
        setTitle(event.target.value)
    }

    const getDescription =(event)=>{
        setDescription(event.target.value)
    }

    const getUserInput = (event)=>{
        event.preventDefault()
        setUpdate(prevState => !prevState)
    }

    const updateTheTask = ()=>{
        setUpdate(prevState => !prevState)
    }

    return(
        <div  className="todos-bg-container">
            {isUpdataed ?
            (<>
            <h1>{title}</h1>
            <p>{description}</p>
            <div>
                <button onClick={updateTheTask} className="update-button" type="button">
                    UPDATE
                </button>
                <button className="delete-button" type="button">
                    DELETE
                </button>
            </div>
            </>):(<form className="form-container" onSubmit={getUserInput}>
        <label htmlFor="todoUserInput" className="label">Title</label>
        <input onChange={getTitle} value={title} type="text" id="todoUserInput" className="todo-user-input" placeholder="What needs to be done?" />
        <label htmlFor="describe" className="label">Describe</label>
        <textarea onChange={getDescription} value={description} cols={105} rows={10} id="describe" className="describe" placeholder="Type here......"/>
        <button type="submit" className="button" id="addTodoButton">submit</button>
        </form>)}
        </div>
    )
}
export default SpecificTask