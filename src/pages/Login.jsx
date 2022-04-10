import React, { useState } from "react";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FORM_CONTAINER_CLASS, FORM_CLASS, INPUT_CLASS, BUTTON_CLASS } from "./classes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const LogIn = ({loggedIn}) => {
    let navigate = useNavigate();
    useEffect(()=>{
        if (loggedIn) navigate("/", {replace:true});
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`Athentication Error: ${errorMessage}`)
            });
    }
    
    return(
        <div className={FORM_CONTAINER_CLASS}>
            <div className={FORM_CLASS}>
                <input placeholder="Email" className={INPUT_CLASS} type="email" onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder="Password" className={INPUT_CLASS} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className={BUTTON_CLASS} onClick={handleLogIn}>Log In</button>
            </div>
        </div>
    )
}

export default LogIn;