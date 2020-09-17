import React, { useContext } from 'react';
import "./Header.css"
import logo from "../../images/Logo.png"
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../App';



const Header = () => {
    const [name, setName, place, setPlace, loggedInUser, setLoggedInUser] = useContext(CategoryContext);
    return (
        <div>

<nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <a class="navbar-brand w-25" href="#">
                    <img class="img-fluid" src={logo} alt="logo" style = {{width:"50%", filter:"brightness(800%)"}}/>
                </a>
                <form>
                <div class="row">
                    <div class="col">
                    <input type="text" class="form-control" placeholder="Search"/>
                    </div>   
                </div>
                </form>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav align-items-center">
                        <li class="nav-item active">
                            
                            <Link to= "/home">
                                <a class="nav-link" href="#home" style = {{color:"white"}}>Home </a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#destination" style = {{color:"white"}}>Destination</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#blog" style = {{color:"white"}}>Blog</a>
                        </li>
                        
                        <li class="nav-item">
                            {/* <button>Login</button> */}
                            <a class="nav-link" href="#">
                                <input class="btn btn-primary" style = {{backgroundColor:"#F9A51A"}} type="submit" value="Log In"/>
                            </a>
                        </li> 
                        <li class="nav-item">
                            <h3>{loggedInUser.email} hi</h3>
                        </li> 
                    </ul> 
                </div>
            </div>
        </nav>             


        </div>
    );
};

export default Header;