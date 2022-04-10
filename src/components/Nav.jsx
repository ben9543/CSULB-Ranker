import React from "react";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const Nav = ({loggedIn}) => {
    let navigate = useNavigate();
    return(
        <div className="flex justify-between items-center px-6 py-6">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <div id="logo-container" className="transition-all hover:bg-gray-800 hover:text-gray-100 duration-300 ease-in-out flex justify-center items-center border border-black py-2 px-4">
                        <p className="font-thin text-2xl tracking-widest">VOTE</p>
                    </div>
                </Link>
                <ul className="flex ml-16">
                    <li><Link className="mr-4" to="/about">About</Link></li>
                    {
                        loggedIn?
                        <>
                            <li><Link className="mr-4" to="/votes">Votes</Link></li>
                        </>
                        :null
                    }
                </ul>
            </div>
            {
                !loggedIn?
                <ul className="flex px-4">
                    <li><Link className="mr-4" to="/signup">SignUp</Link></li>
                    <li><Link className="mr-4" to="/login">Login</Link></li>
                </ul>
                    :
                // Sign Out
                <ul className="flex px-4">
                    <li onClick={()=>signOut(auth).then(()=>navigate("/"))}><p>Sign Out</p></li>
                </ul>
            }
        </div>
    )
}

export default Nav;