import React from "react";
import { useNavigate } from "react-router-dom";
import { INPUT_CLASS, BUTTON_CLASS } from "./classes";

const Post = ({loggedIn}) => {
    let navigate = useNavigate();
    if (!loggedIn) return navigate("/");
    const handlePost = async() => {

    }
    return(
        <div className="flex flex-col justify-center items-center">
            <div className="">
                <div className="text-3xl mb-10">
                    <h1>Create a Post</h1>
                </div>
                <div className="">
                    <input id="title" placeholder="Title" className={INPUT_CLASS}/>
                    <input id="subtitle" placeholder="Subtitle" className={INPUT_CLASS}/>
                    <textarea maxlength="200" id="content" placeholder="Write ..." className="w-full px-4 py-2 focus:outline-none border h-48 text-justify"/>
                    <button className={BUTTON_CLASS}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Post;