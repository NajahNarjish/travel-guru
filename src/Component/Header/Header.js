import React, { useContext } from 'react';
import "./Header.css";
import logo from "../../images/Logo.png";
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../App';



const Header = () => {
    const [name, setName, place, setPlace, loggedInUser, setLoggedInUser] = useContext(CategoryContext);
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container">
                    <a class="navbar-brand w-25" href="#">
                        <img class="img-fluid" src={logo} alt="logo" style = {{width:"50%", filter:"brightness(0%)"}}/>
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
                                    <a class="nav-link" href="#home" style = {{color:"black"}}>Home </a>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#destination" style = {{color:"black"}}>Destination</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#blog" style = {{color:"black"}}>Blog</a>
                            </li>
                            
                            <li class="nav-item">
                                <button class="btn btn-primary" style = {{backgroundColor:"#F9A51A"}} onClick={() => setLoggedInUser({})}>Sign out</button>
                                
                            </li> 
                            <li class="nav-item">
                                <h6 style = {{marginLeft:"5px"}}>{loggedInUser.displayName || loggedInUser.name}</h6>
                            </li> 
                        </ul> 
                    </div>
                </div>
            </nav>             
        </div>
    );
};

export default Header;