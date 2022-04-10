import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, readDocument, updateDocument } from "../firebase";
import { CARD_CLASS,ROUND_BUTTON_CLASS } from "./classes";
import { CaretUpFill, CaretDownFill } from "@styled-icons/bootstrap";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
const auth = getAuth(app);

const Card = ({postId, bigHeading, smallHeading, upVotes, downVotes, handleUp, handleDown, userUpVotes, userDownVotes}) => {
    const [upVoteCount, setUpVoteCount] = useState();
    const [downVoteCount, setDownVoteCount] = useState();
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [isDownVoted, setIsDownVoted] = useState(false);
    console.log(isDownVoted)
    useEffect(()=>{
        setUpVoteCount(upVotes);
        setDownVoteCount(downVotes);
        console.log(userUpVotes, userDownVotes)
        if (userUpVotes.includes(postId))setIsUpVoted(true);
        if(userDownVotes.includes(postId))setIsDownVoted(true);
    },[userUpVotes, userDownVotes])
    return(
        <div className={`overflow-hidden ${CARD_CLASS}`}>
            <div id="heading-container" className="border-r overflow-scroll">
                <h1 className="text-xl font-semibold">{bigHeading}</h1>
                <h3 className="text-md font-thin">{smallHeading}</h3>
            </div>
            <div id="botton-container" className="border-l flex items-center justify-center">
                <div id="up" className={`cursor-pointer hover:bg-green-400 ${isUpVoted ? "bg-green-400" : null} w-full h-full flex items-center justify-center`} onClick={()=>handleUp(postId, upVoteCount, downVoteCount, setUpVoteCount, setDownVoteCount)}>
                    <div style={{transform:"translateY(10%)"}} className="flex flex-col justify-center items-center">
                        <CaretUpFill size="40"/>
                        <p>{upVoteCount}</p>
                    </div>
                </div>
                <div id="down" className={`cursor-pointer hover:bg-red-400 ${isDownVoted ? "bg-red-400" : null} w-full h-full flex items-center justify-center`} onClick={()=>handleDown(postId, upVoteCount, downVoteCount, setUpVoteCount, setDownVoteCount)}>
                    <div style={{transform:"translateY(10%)"}} className="flex flex-col justify-center items-center">
                        <CaretDownFill size="40"/>
                        <p>{downVoteCount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Vote = ({loggedIn}) => {
    let navigate = useNavigate();
    const [data, setData] = useState(null);
    const [docUserId, setDocUserId] = useState(null);
    const [userUpVotes, setUserUpVotes] = useState([]);
    const [userDownVotes, setUserDownVotes] = useState([]);

    useEffect(()=>{
        if (!loggedIn) navigate("/", {replace:true});
    },[]);
    useEffect(()=>{
        async function readData(){
            const userData = await readDocument("user");
            userData.forEach(doc => {
                if(auth.currentUser.uid === doc.data().uid){
                    let d = doc.data();
                    let tempArr1 = d.upVotes;
                    let tempArr2 =  d.downVotes;
                    setUserUpVotes(tempArr1);
                    setUserDownVotes(tempArr2);
                    setDocUserId(doc.id)
                }
            })
        }
        readData();
    },[])
    useEffect(()=>{
        async function readData(){
            const tempArr = [];
            const newData = await readDocument("post");
            newData.forEach(doc=>{
                tempArr.push({...doc.data(), id:doc.id});
            })
            setData(tempArr);
        }
        readData();
    },[])

    // 1. Get current user
    // 2. Read user data from firestore
    // 3. Find the correct user data
    // 4. If the post id is in user.votes
    
    const handleUp = async(postId, upVotes, setUpVoteCount) => {
        let tempArr = [];
        if (userUpVotes.includes(postId) || userDownVotes.includes(postId)){
            return toast.error("You have already voted.")
        }
        tempArr = userUpVotes;
        tempArr.push(postId);
        setUserUpVotes(tempArr);
        updateDocument("post", postId, {upVotes: upVotes+1});
        updateDocument("user", docUserId, {upVotes:userUpVotes});
        setUpVoteCount(upVotes+1);
    
    }
    const handleDown = async(postId, downVotes, setDownVoteCount) => {
        let tempArr;
        if (userDownVotes.includes(postId) || userUpVotes.includes(postId)){
            return toast.error("You have already voted.")
        }
        tempArr = userDownVotes;
        tempArr.push(postId);
        setUserDownVotes(tempArr);
        updateDocument("post", postId, {downVotes: downVotes+1});
        updateDocument("user", docUserId, {downVotes:userDownVotes});
        setDownVoteCount(downVotes+1);
    }
    return(
        <>
        <div className="p-4 bg-gray-200 border-2 border-gray-300 flex flex-col w-full lg:grid lg:grid-cols-3 lg:gap-4 min-h-screen">
            {
                data !== null?
                data.map((v,k)=>{
                    return <Card 
                        key={k} 
                        postId={v.id}
                        bigHeading={v.bigHeading} 
                        smallHeading={v.smallHeading} 
                        content={v.content}
                        upVotes={v.upVotes}
                        downVotes={v.downVotes}
                        handleUp={handleUp}
                        handleDown={handleDown}
                        userUpVotes={userUpVotes}
                        userDownVotes={userDownVotes}/>
                }):null
            }
        </div>
        <div id="create-post" style={{bottom:"30px", right:"30px"}} className="fixed">
            <Link to="/post">
                <button className={ROUND_BUTTON_CLASS}>+</button>
            </Link>
        </div>
        </>
    )
}

export default Vote;