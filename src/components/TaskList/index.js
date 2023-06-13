import { Link } from "react-router-dom"

import "./index.css"

const TaskList = (props)=>{
    const {task} = props
    const {id,title,about} = task

    return(
        <Link to={`/task/${id}`} className="link-item">
        <li className="todo-item" >
            <h1 className="todo-heading">{title}</h1>
            <p>{about}</p>
        </li>
        </Link>
    )
}

export default TaskList




                
               