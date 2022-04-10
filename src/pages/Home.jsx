import React from "react";
import { toast } from "react-toastify";
import { ChevronDown } from "@styled-icons/bootstrap";
import {BUTTON_CLASS} from "./classes";
import { Link } from "react-router-dom";

const Home = ({loggedIn}) => {
    if (loggedIn) toast.success("Logged In");
    return(
        <div>
            <div id="chevron-container" className="flex flex-col justify-center items-center h-screen w-full"> 
                <div id="icon-down" style={{transform:"translateY(-80%)"}}>
                    <ChevronDown size="150"/>
                </div>
                <div className="flex w-1/2 flex justify-center items-center">
                    <Link className="mr-2" to="/vote"><button className={BUTTON_CLASS}>Get Started</button></Link> 
                    <Link className="ml-2" to="/about"><button className={BUTTON_CLASS}>Learn More</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home;