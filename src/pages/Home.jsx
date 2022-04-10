import React from "react";
import { toast } from "react-toastify";
import { ChevronUp } from "@styled-icons/bootstrap";
import {BUTTON_CLASS} from "./classes";
// <ChevronUp size={"300"} />
const Home = ({loggedIn}) => {
    if (loggedIn) toast.success("Logged In");
    return(
        <div>
            <div className="flex flex-col justify-center items-center h-screen w-full"> 
                <div className="flex w-64">
                    <button className={BUTTON_CLASS}>Get Started</button>
                    <button className={BUTTON_CLASS}>Learn More</button>
                </div>
            </div>
        </div>
    )
}

export default Home;