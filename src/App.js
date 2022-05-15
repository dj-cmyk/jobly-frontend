import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import JobList from './JobList';
import CompanyDetail from './CompanyDetail';
import CompanyList from './CompanyList';
import SignUpForm from './SignUpForm';
import Profile from './Profile';
import LoginForm from './LoginForm';
import { Route, Switch } from "react-router-dom";
import JoblyApi from './Api';
import UserContext from './UserContext';
import jwt from "jsonwebtoken";
import ProtectedRoute from './ProtectedRoute';
import UseLocalStorage from './UseLocalStorage';


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = UseLocalStorage('token', null)


  useEffect(() => {
    async function getUserInfo() {
      if (token) {
        try {
          JoblyApi.token = token;
          //get username from token
          let { username } = jwt.decode(token);
          let user = await JoblyApi.getUser(username);
          setCurrentUser(user);
        } catch(err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getUserInfo();
  }, [token]);



  const signup = async (signupFormData) => {
    let token = await JoblyApi.signup({...signupFormData})
    setToken(token)
  }

  const login = async (loginFormData) => {
    try {
      let token = await JoblyApi.login({...loginFormData});
      setToken(token);
    } catch (err) {
      console.log(err)
    }
  }

  const update = async (profileFormData) => {
    try {
      let user = await JoblyApi.updateUser({...profileFormData});
      setCurrentUser(user)
    } catch (err) {
      console.log(err)
    }
  }
  
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }
  
  if (!infoLoaded) return <p>Loading &hellip;</p>;

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={currentUser} >
        <NavBar logout={logout}/>
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <ProtectedRoute exact path="/companies">
              <CompanyList />
            </ProtectedRoute>
            
            <ProtectedRoute 
              exact 
              path="/companies/:handle" 
              render={({ match }) => <CompanyDetail handle={match.params.handle} />}
            />

            <ProtectedRoute exact path="/jobs">
              <JobList />
            </ProtectedRoute>
            <Route exact path="/login">
              <LoginForm login={login}/>
            </Route>
            <Route exact path="/signup">
              <SignUpForm signup={signup} />
            </Route>
            <ProtectedRoute exact path="/profile">
              <Profile update={update}/>
            </ProtectedRoute>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
