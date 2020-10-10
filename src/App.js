import React from 'react';
import TasksIndex from './Tasks/Index'
import TasksBar from './Tasks/CreateTaskBar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <TasksBar />
      <TasksIndex />
    </>
  )
}

export default App;
