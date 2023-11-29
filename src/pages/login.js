import React, { Component } from "react";
import "./login.css";
import Sidebar from "../Components/Sidebar";

import Homepage from "./Homepage";
import thanksandtip from '../images/Thanksandtip.png';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handlEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    const { email, password } = this.state;

    // Envoyer les informations d'identification au backend
    fetch(process.env.REACT_APP_BACKEND_URL + "/login/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          // La connexion est réussie, rediriger l'utilisateur
          response.json().then((data) => {
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("isCEO", data.isCEO);
          });

          console.log(localStorage.getItem("isCEO"));

          window.location.href = "/Homepage";
        } else {
          // Afficher un message d'erreur
          alert("Identifiant ou mot de passe incorrect.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
      });
  };
  render() {
    return (
        <div className="login-container">
          <div className='image' >
          <img className='logo' src={thanksandtip} alt="Description de l'image" />
          </div>
          <form className='forme'> 
            <div className="form-group">
              <label>Mail Adress </label>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handlEmailChange}
              />
            </div>
            <div className="form-group">
              <label>Passeword </label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <button type="button" onClick={this.handleLogin}>
              Log in ➡
            </button>
          </form>
          <p>
            Si vous n'avez pas encore de compte, veuillez{" "}
            <a href="./signup">créer un compte</a>.
          </p>
        </div>
    );
  }
}

export default LoginPage;
