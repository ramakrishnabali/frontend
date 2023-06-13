// import { useState,useEffect } from "react"
import { Component } from "react"

import {v4} from "uuid"
import TaskList from "../TaskList"

import "./index.css"

class Home extends Component {
    // const [title,setTitle] = useState("")
    // const [description,setDescription] = useState("")
    // const [taskList,setTaskList] = useState([])

    // useEffect(()=>{
    //     const getTheTasks = async ()=>{
    //         const api = "http://localhost:3001/get"
    //         const options={
    //             method:"GET",      
    //         }
    //         const response = await fetch(api,options)
    //         const data = await response.json()
    //         // const dataLength = data.length 
    //         console.log(data.success)
    //             setTaskList(data.success)
            
    //             
    //     }
    //     getTheTasks()

    // },[])

    state = {title:"", about:"",taskList:[],isEmpty:false}
    componentDidMount(){
        this.getTheTasks()
    }
    getTheTasks = async ()=>{
        const api = "http://localhost:3001/get"
        const options={
            method:"GET",      
        }
        const response = await fetch(api,options)
        const data = await response.json()
        if (response.ok){
            this.setState({taskList:[...data.success]})
        }    
    }

    getTitle = (event)=>{
        this.setState({title:event.target.value})
    }

    getDescription =(event)=>{
        this.setState({about:event.target.value})
    }

    postData = async (newTask)=>{
        const postApi = "http://localhost:3001/post"
        const options = {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
           "Accept":"application/json"},
        body:JSON.stringify(newTask)
        }

        await fetch(postApi,options)
    }

    getUserInput = (event)=>{
        event.preventDefault()
        const {title,about} = this.state

        if (title !== "" && about !== ""){
            const newTask = {
                id:v4(),
                title,
                about
            }
            this.postData(newTask)  
            this.setState(prevState =>({taskList:[newTask, ...prevState.taskList],title:"",about:"",isEmpty:false}))
        }
        if (title === "" || about === ""){
            this.setState({isEmpty:true})
        }

    }
    

render(){
    const {title,about,taskList,isEmpty} = this.state
    return(
    <div className="todos-bg-container">
        <form className="form-container" onSubmit={this.getUserInput}>
        <h1 className="create-task-heading">
             Create <span className="create-task-heading-subpart">Task</span>
        </h1>
        <label htmlFor="todoUserInput" className="label">Title</label>
        <input onChange={this.getTitle} value={title} type="text" id="todoUserInput" className="todo-user-input" placeholder="What needs to be done?" />
        {isEmpty && <p className="required">Required</p>}
        <label htmlFor="describe" className="label">Describe</label>
        <textarea onChange={this.getDescription} value={about} cols={105} rows={10} id="describe" className="describe" placeholder="Type here......"/>
        {isEmpty && <p className="required">Required</p>}
        <button type="submit" className="button" id="addTodoButton">Create</button>
        </form>
        <h1 className="todo-items-heading">
            My <span className="todo-items-heading-subpart">Tasks</span>
        </h1>
        {taskList.length>0 ?
        (<>
        <p className="indicator">click on task you can update/delete</p>
        <ul className="todo-items-container">
            
            {taskList.map(eachTask =>(
                <TaskList task={eachTask} key={eachTask.id} />    
        ))}
        </ul>
        </>):null}
    </div>
)}

}

export default Home