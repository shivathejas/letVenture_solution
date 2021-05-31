import React, { Component } from "react";
import "./app.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import ReactImage from "./react.png";

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <Header/>
        <Main/>
        <Footer/>
        {/* {username ? (
          <h1>{`Hello ${username}`}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )} */}
      </div>
    );
  }
}
