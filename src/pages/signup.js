import React, { Component } from "react";
import "./login.css";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      message: "",
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSignup = () => {
    const { username, email, password } = this.state;
    const userData = { username, email, password };

    fetch(process.env.REACT_APP_BACKEND_URL + "/login/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        console.log("here");
        console.log(response);
        if (response.status === 200) {
          console.log("here2");
          alert("Inscription réussie !");
          window.location.href = "/login";
          this.setState({
            message:
              'Inscription réussie ! Vous pouvez vous connecter en cliquant sur ce lien directement :  <a href="./login.js">connecter ici</a>.',
          });
        } else {
          this.setState({
            message: "L'inscription a échoué. Veuillez réessayer.",
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
      });
  };

  render() {
    return (
      <div className="login-container">
        <h2>Enrôlement</h2>
        <form>
          <div className="form-group">
            <label for="username">Prénoms et Nom complets :</label>
            <input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
              value={this.state.email}
              onChange={this.handleEmailChange}
              size="30"
            />
          </div>
          <div className="form-group">
            <label for="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="button" onClick={this.handleSignup}>
            S'inscrire
          </button>
        </form>
      </div>
    );
  }
}

export default SignupPage;
