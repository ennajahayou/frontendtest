import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import DIOList from "./Components/DIOList";
import LoginA from './pages/loginA';

const dioData = [
  {
    name: "DIO 1",
    description:
      "Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description de DIO 1 Description  ",
  },
  { name: "DIO 2", description: "Description de DIO 2" },
];

const App = () => {
  return (
    <div>
      <LoginA />
    </div>
  );
};

export default App;
