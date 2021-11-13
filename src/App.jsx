import React, { useState, useEffect } from 'react';
import facade from './apiFacade';

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (event) => {
    event.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (event) => {
    setLoginCredentials({ ...loginCredentials, [event.target.id]: event.target.value })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input type="text" placeholder="User Name" id="username" />
        <input type="text" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )

}

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData().then(data => setDataFromServer(data.msg));
  }, []);
  
  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  )

}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(response => setLoggedIn(true));
  }

  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) : 
      (<div>
        <LoggedIn />
        <button onClick={logout}>Logout</button>
      </div>)}
    </div>
  )

}
export default App;