// "use client"

// import React, { createContext, useState, useContext, useEffect } from "react"
// import axios from "axios"
// import { useAuth } from "./AuthContext"

// const TaskContext = createContext(undefined)

// export const TaskProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([])
//   const { userId, isAuthenticated } = useAuth()

//   const fetchTasks = async () => {
//     if (isAuthenticated && userId) {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`)
//         setTasks(response.data)
//         console.log(response)
  
//       } catch (error) {
//         console.error("Error fetching tasks:", error)
//       }
//     }
//   }

//   const addTask = async (task) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/tasks", task)
//       setTasks([...tasks, response.data])
//     } catch (error) {
//       console.error("Error adding task:", error)
//     }
//   }

//   const updateTask = async (taskId, updates) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updates)
//       setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)))
//     } catch (error) {
//       console.error("Error updating task:", error)
//     }
//   }

//   const deleteTask = async (taskId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
//       setTasks(tasks.filter((task) => task._id !== taskId))
//     } catch (error) {
//       console.error("Error deleting task:", error)
//     }
//   }

//   // useEffect(() => {
//   //   if (isAuthenticated) {
//   //     fetchTasks()
//   //   }
//   // }, []) // Removed fetchTasks from dependencies to avoid unnecessary re-renders

//   return (
//     <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
//       {children}
//     </TaskContext.Provider>
//   )
// }

// export const useTask = () => {
//   const context = useContext(TaskContext)
//   if (!context) {
//     throw new Error("useTask must be used within a TaskProvider")
//   }
//   return context
// }
"use client"
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import emailjs from "@emailjs/browser";

const TaskContext = createContext(undefined);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { userId, isAuthenticated } = useAuth();

  const fetchTasks = async () => {
    if (isAuthenticated && userId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updates);
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const sendEmailNotification = async () => {
    const now = new Date();
    const pendingTasks = tasks.filter((task) => {
      const taskDueDate = new Date(task.dueDate);
      return !task.completionStatus && taskDueDate >= now;
    });

    const emailParams = {
      to_email: "your-email@example.com", // Replace with the user's email
      subject: pendingTasks.length > 0 ? "Pending Tasks Reminder" : "Congratulations!",
      message:
        pendingTasks.length > 0
          ? `You have the following pending tasks:\n\n${pendingTasks
              .map((task) => `- ${task.title} (Due: ${new Date(task.dueDate).toLocaleDateString()} ${task.dueTime})`)
              .join("\n")}`
          : "You have completed all your tasks for today!",
    };

    try {
      await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams, "YOUR_USER_ID");
      console.log("Email notification sent successfully");
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchTasks();
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (tasks.length > 0) {
      const notificationTimes = [9, 12, 15, 18]; // 9 AM, 12 PM, 3 PM, 6 PM
      const checkAndSendNotification = () => {
        const currentHour = new Date().getHours();
        if (notificationTimes.includes(currentHour)) {
          sendEmailNotification();
        }
      };
      const notificationInterval = setInterval(checkAndSendNotification, 60 * 60 * 1000);
      return () => clearInterval(notificationInterval);
    }
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask, sendEmailNotification }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
