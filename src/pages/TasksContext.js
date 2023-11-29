import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TasksContext = createContext();

const dioId = 1; //TODO : add real DIO id

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const [dioTasks, setDIOTasks] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/DIO/execution?dioId=" + dioId)
      .then((res) => {
        setDIOTasks(res.data);
      });
  }, []);
  const [propositions, setPropositions] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const addDIOTask = (task) => {
    setDIOTasks((prevTasks) => [...prevTasks, task]);
  };

  const addProposition = (proposition) => {
    setPropositions((prevPropositions) => [...prevPropositions, proposition]);
  };

  const [prop, setProp] = useState([]);
  const addProp = (description) => {
    setProp((prevProps) => [...prevProps, description]);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        dioTasks,
        addDIOTask,
        propositions,
        addProposition,
        prop,
        setProp,
        addProp,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
