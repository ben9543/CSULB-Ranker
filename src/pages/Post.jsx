import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveDocument } from "../firebase";
import { INPUT_CLASS, BUTTON_CLASS } from "./classes";

const Post = ({loggedIn}) => {
    let navigate = useNavigate();
    const [bigHeading, setBigHeading] = useState("");
    const [smallHeading, setSmallHeading] = useState("");
    useEffect(()=>{
        if (!loggedIn) return navigate("/login");
    },[])
    const handlePost = async() => {
        saveDocument("post", {
            bigHeading,
            smallHeading,
            upVotes:0,
            downVotes:0
        });
        toast("Successfully created the post!")
        navigate("/vote", {replace:true});
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <div className="w-2/3 flex flex-col justify-center items-center">
                <div className="text-3xl mb-10">
                    <h1>Create a Post</h1>
                </div>
                <div className="w-1/2">
                    <input required id="title" placeholder="Write something to post" className={`h-16 ${INPUT_CLASS}`} onChange={(e)=>setBigHeading(e.target.value)}/>
                    <button onClick={handlePost} className={BUTTON_CLASS}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Post;