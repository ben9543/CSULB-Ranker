import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveDocument } from "../firebase";
import { INPUT_CLASS, BUTTON_CLASS } from "./classes";

const Post = ({loggedIn}) => {
    let navigate = useNavigate();
    const [bigHeading, setBigHeading] = useState("");
    const [smallHeading, setSmallHeading] = useState("");
    const [content, setContent] = useState("");
    if (!loggedIn) return navigate("/");
    const handlePost = async() => {
        saveDocument("post", {
            bigHeading,
            smallHeading,
            content,
            upVotes:0,
            downVotes:0
        });
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
                    <textarea maxlength="200" id="content" placeholder="Write ..." className="w-full px-4 py-2 focus:outline-none border h-48 text-justify" onChange={(e)=>setContent(e.target.value)}/>
                    <button onClick={handlePost} className={BUTTON_CLASS}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Post;