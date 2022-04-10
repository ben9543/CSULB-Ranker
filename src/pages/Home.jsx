import React from "react";
import { toast } from "react-toastify";
import { ChevronUp } from "@styled-icons/bootstrap";
import {BUTTON_CLASS} from "./classes";
import { Link } from "react-router-dom";
// <ChevronUp size={"300"} />
const Home = ({loggedIn}) => {
    if (loggedIn) toast.success("Logged In");
    return(
        <div>
            <div className="flex flex-col justify-center items-center h-screen w-full"> 
                <div className="flex w-64">
                    <Link to="/vote"><button className={BUTTON_CLASS}>Get Started</button></Link> 
                    <Link to="/about"><button className={BUTTON_CLASS}>Learn More</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home;