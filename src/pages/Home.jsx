import React from "react";
import { toast } from "react-toastify";

const Home = ({loggedIn}) => {
    if (loggedIn) toast.success("Logged In");
    return(
        <div>
            <div>
                <p>Ranker for CSULB</p>
                <p>Must login with CSULB email</p>
            </div>
        </div>
    )
}

export default Home;