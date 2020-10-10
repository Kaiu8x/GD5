import React, { useState,useEffect } from 'react'

import axios from 'axios'
const Index = () => {
    const [tasks,setTasks] = useState([
        {description: '', status:''},
    ])

    useEffect(() => {
    axios("http://localhost:3000/allTasks")
        .then((result) => {
            console.log(result)
        setTasks(result.data);
        })
        .catch((error) => {
        console.log('There was an error: ', error);
        });
    }, []);
    
    
    return (
        <div className="container" >
            <div > 
                <h1 className="text-center">Tasks with React</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" >
                            <form className="form-inline" >
                                <div className="input-group w-100">
                                <input id="task_description" type="text" name="description" placeholder="Task to do ..." className="form-control"/>
                                <div className="input-group-append">
                                    <input type="button" onClick={(e) => createTask(document.getElementById("task_description").value)}  value="Add" className="btn btn-primary"/>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
            <div className="row">

                <div className="col-lg-12" id="tasksList">
                {tasks.map((task,i)=>{
                    if (task.status==="pending") {
                        return(
                            <div className="card my-2" key={i} >
                                <span className="text-secondary text-right p-1"><h6>This task is pending</h6></span>

                                <div className="card-body">
                                    <p className="card-text">Pending task: { task.description }</p>
                                    <input id={task.id} type="button" onClick={(e) => doneTask(task.id)} value="Done" className="btn btn-primary  mx-2"/>
                                    <input id={"del-" +task.id} type="button" onClick={(e) => deleteTask(task.id)} value="Delete" className="btn btn-danger mx-2"/>
                                </div>
                            </div>
                            
                        )
                    }
                    else if (task.status==="done") {
                        return(
                            <div className="card my-2 bg-light" key={i}>
                                <span className="text-secondary text-right p-1"> <h6>This task is done</h6> </span>

                                <div className="card-body disabled text-secondary">
                                    <p className="card-text">Task done: { task.description }</p>
                                    <input id={"del-" +task.id} type="button" onClick={(e) => deleteTask(task.id)} value="Delete" className="btn btn-danger  mx-2"/>
                                </div>
                            </div>
                            
                        )
                    }

                })}
                </div>

            </div>
            </div>
        </div>

    )
    function deleteTask(id){
        axios.post(`http://localhost:3000/deleteTask/`, {
            id: id,
        }).then((result) => {
            setTasks(result.data);

        })
        
    };
    function createTask(description){
        axios.post(`http://localhost:3000/createTask/`, {
            description: description,
        }).then(() => {
            axios("http://localhost:3000/allTasks")
            .then((result) => {
                console.log(result)
            setTasks(result.data);
            })
            .catch((error) => {
            console.log('There was an error: ', error);
            });
        })
        
    };

    function doneTask(id){
        axios.post(`http://localhost:3000/doneTask/`, {
            id: id,
        }).then((result) => {
            setTasks(result.data);
        })
        
    };
}
export default Index