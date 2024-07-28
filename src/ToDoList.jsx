
// Import necessary React hook
import { useState } from 'react';
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
// import './mode.css'

function ToDoList() {
    const { theme,toggleTheme } = useContext(ThemeContext);
    // Create state variables to manage tasks and new task input
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Learn React', completed: false },
            { id: 2, text: 'Build a To-Do App', completed: true },
        ]); // Array to store tasks
    const [newTask, setNewTask] = useState(""); // String to hold new task value
   
    // Function to handle changes in the input field
    function handleInputChange(event) {
        // Update the newTask state with the user's input value
        setNewTask(event.target.value);
    }

    // Function to add a new task to the list
    function addTask() {
        // Check if the new task input is not empty after trimming whitespace
        if (newTask.trim() !== "") {
            // Create a copy of the tasks obj using spread operator (...)
            
            setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }]); setNewTask("");
        }
    }

    // Function to delete a task from the list
    function deleteTask(index) {
        // Create a new array excluding the task at the given task.id
        const updatedTasks = tasks.filter((_, i) => i !== index);
        // Update the tasks state with the filtered array
        setTasks(updatedTasks);
    }
    const handleCheckboxChange = (index) => {
        setTasks(tasks.map((task,i) => 
          i === index ? { ...task, completed: !task.completed } : task
         ));
    };
    // Function to move a task up in the list (with boundary check)
    function moveTaskUp(index) {
        // Check if the task is not already at the top (index > 0)
        if (index > 0) {
            // Create a copy of the tasks array using spread operator (...)
            const updatedTasks = [...tasks];
            // Swap the elements at the current and previous index using destructuring assignment
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            // Update the tasks state with the reordered array
            setTasks(updatedTasks);
        }
    }

    // Function to move a task down in the list (with boundary check)
    function moveTaskDown(index) {
        // Check if the task is not already at the bottom (index < tasks.length - 1)
        if (index < tasks.length - 1) {
            // Create a copy of the tasks array using spread operator (...)
            const updatedTasks = [...tasks];
            // Swap the elements at the current and next index using destructuring assignment
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            // Update the tasks state with the reordered array
            setTasks(updatedTasks);
        }
    }

    // Return JSX to render the To-Do List component
    return (<div className={`${theme==="Light"?'light':'dark'}`}>
        <div className="bg-gray-200 dark:bg-neutral-700 overflow-hidden h-screen w-screen p-4 flex flex-col items-center ">
        
           <div className='flex gap-5'>
           <h1 className='text-3xl mt-9 text-center hover:text-white hover:cursor-pointer hover:shadow-md'>To-Do-List</h1>
            <div
        onClick={toggleTheme}
        className={`border border-slate-800 dark:border-yellow-600 rounded-full absolute top-[54px] right-[550px] w-10 h-10 ${theme==="Light"?'bg-night bg-cover':'bg-day bg-cover'}`}></div>
           </div>
            <div className=' m-3 p-3'>
            
                <input className='m-2 outline-none hover:border-green-400 rounded-md shadow-xl text-xl w-[75%] border-2 border-blue-600 transition-colors duration-200 ease-in-out'
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask} // Bind input value to newTask state
                    onChange={handleInputChange} // Call handleInputChange on input change
                />
                <button className="bg-green-400 border-2  border-green-500 px-1 py-0.5 rounded-lg hover:bg-green-500 hover:text-white transition-colors duration-200 ease-in-out" onClick={addTask}>
                    Add
                </button>
            </div>

            {/* Render tasks as an ordered list */}
            <ol>
                {tasks.map((task,index) => (
            
                <li key={task.id} className='flex gap-2 m-4 p-1 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80 border border-green-500 shadow-sm shadow-green-400'>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={()=>handleCheckboxChange(index)}
                        />
                        <span className="text-xl m-1" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span> {/* Display the task text */}
                        <div className="bg-trash border-2 w-[34px] h-[34px] hover:animate-bounce border-gray-400 rounded-md hover:text-white hover:border-red-400  cursor-pointer" onClick={() => deleteTask(index)}>
                            
                        </div>
                        <button className="text-2xl hover:opacity-85" onClick={() => moveTaskUp(index)}>
                            ⬆️
                        </button>
                        <button className="text-2xl hover:opacity-85" onClick={() => moveTaskDown(index)}>
                            ⬇️
                        </button>
                    </li>
             
))}
            </ol>
        </div></div>
    );
}

export default ToDoList;

