import React, { useState,useEffect } from 'react'
import TasksIndex from './Index'
import axios from 'axios'
const TaskBar = () => {
    const [tasks,setTasks] = useState([
        {description: '', status:''},
    ])

    useEffect(() => {
        
    }, []);
    return (
        <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark  mb-5">
        <a className="navbar-brand" href="/">TODO List with React GD #5</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        </nav>
        </div>
    )

    function createTask(description){
        axios.post(`http://localhost:3001/createTask/`, {
            description: description,
        }).then(() => {
            axios("http://localhost:3001/allTasks")
            .then((result) => {
                console.log(result)
            setTasks(result.data);
            })
            .catch((error) => {
            console.log('There was an error: ', error);
            });
        })
        
    };
}
export default TaskBar