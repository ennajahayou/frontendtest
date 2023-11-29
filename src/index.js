// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import DIOhomepage from "./pages/DIOhomepage/DIOhomepage";
// import CEOProfil from "./pages/CEOProfil";
// import ExecutionBoard from "./pages/Executionboard";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <DIOhomepage />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DIOhomepage from "./pages/DIOhomepage/DIOhomepage";
import CEOProfil from "./pages/CEOProfil/CEOProfil";
import ExecutionBoard from "./pages/ExecutionBoard/ExecutionBoard";
import Archives from "./pages/Archives";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import UserDetails from "./pages/UserDetails/UserDetails";
import Parameters from "./pages/Parameters/Parameters";
import LoginA from "./pages/loginA";

import { TasksProvider } from "./pages/TasksContext";

export default function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginA />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="DIO" element={<DIOhomepage />} />
          <Route path="CEOProfil" element={<CEOProfil />} />
          <Route path="ExecutionBoard" element={<ExecutionBoard />} />
          <Route path="Archives" element={<Archives />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="loginA" element={<LoginA />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="UserDetails" element={<UserDetails />} />
          <Route path="Parameters" element={<Parameters />} />
        </Routes>
      </BrowserRouter>
    </TasksProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
