import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveDocument } from "../firebase";
import { INPUT_CLASS, BUTTON_CLASS } from "./classes";

const Post = ({loggedIn}) => {
    let navigate = useNavigate();
    const [bigHeading, setBigHeading] = useState("");
    const [smallHeading, setSmallHeading] = useState("");
    if (!loggedIn) return navigate("/");
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
            <div className="">
                <div className="text-3xl mb-10">
                    <h1>Create a Post</h1>
                </div>
                <div className="">
                    <input required id="title" placeholder="Title" className={INPUT_CLASS} onChange={(e)=>setBigHeading(e.target.value)}/>
                    <input id="subtitle" placeholder="Subtitle (optional)" className={INPUT_CLASS} onChange={(e)=>setSmallHeading(e.target.value)}/>
                    <button onClick={handlePost} className={BUTTON_CLASS}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Post;