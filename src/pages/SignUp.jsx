import React, { useEffect, useState } from "react";
import { app, saveDocument } from "../firebase";
import {useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FORM_CLASS, INPUT_CLASS, BUTTON_CLASS, FORM_CONTAINER_CLASS } from "./classes";
import { checkEmail } from "../utils";
import { toast } from 'react-toastify';
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const SignUp = ({loggedIn}) => {
    let navigate = useNavigate();
    useEffect(()=>{
        if (loggedIn) navigate("/", {replace:true});
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const handleSignUp = () => {
        if (checkEmail(email)){
            createUserWithEmailAndPassword(auth, email, password)
                .then(async(userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    if(user) {
                        await saveDocument("user", {
                            uid:user.uid,
                            email,
                            username,
                            upVotes:[],
                            downVotes:[]
                        })
                        navigate("/");
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(`Athentication Error: ${errorMessage}`);
            });
        }else{
            toast.error(`Athentication Error: User must use CSULB email`);
        }
    }
    return(
        <div className={FORM_CONTAINER_CLASS}>
            <div className={FORM_CLASS}>
                <input placeholder="Email" className={INPUT_CLASS} type="email" onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder="Password" className={INPUT_CLASS} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <input placeholder="Username" className={INPUT_CLASS} type="text" onChange={(e)=>setUsername(e.target.value)}/>
                <button className={BUTTON_CLASS} onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp;