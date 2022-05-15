import React, {useContext} from 'react';
import UserContext from './UserContext';
import { Link } from "react-router-dom";
import "./Home.css"


const Home = () => {
    const user = useContext(UserContext)

    if (user) {
        return(
            <div className="Homepage">
                <h1>JOBLY</h1>
                <h4>Welcome Back {user.firstName}</h4>
            </div>
        )
    }
    return(
        <div className="Homepage">
        <h1>JOBLY</h1>
        <h4>All the jobs in one, convenient place.</h4>
        <Link className="btn btn-primary btn-lg Homepage-btn" to='/login'>Log In</Link>
        <Link className="btn btn-primary btn-lg Homepage-btn" to='/signup'>Sign Up</Link>
        </div>
    )
}

export default Home;