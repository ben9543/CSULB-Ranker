import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readDocument } from "../firebase";
import { CARD_CLASS,ROUND_BUTTON_CLASS } from "./classes";
import { CaretUpFill, CaretDownFill } from "@styled-icons/bootstrap";

const Card = ({bigHeading, smallHeading, content, upVotes, downVotes, handleUp, handleDown}) => {
    return(
        <div className={`overflow-hidden ${CARD_CLASS}`}>
            <div id="heading-container" className="border-r">
                <h1 className="text-2xl font-semibold">{bigHeading}</h1>
                <h3 className="text-md font-thin">{smallHeading}</h3>
                <div style={{overflow:"scroll"}} className="mt-3 text-xs break-words">
                    <p className="" style={{overflow:"scroll"}}>{content}</p>
                </div>
            </div>
            <div id="botton-container" className="border-l flex items-center justify-center">
                <div id="up" className="cursor-pointer hover:bg-green-400 w-full h-full flex items-center justify-center" onClick={handleUp}>
                    <div style={{transform:"translateY(10%)"}} className="flex flex-col justify-center items-center">
                        <CaretUpFill size="40"/>
                        <p>{upVotes}</p>
                    </div>
                </div>
                <div id="down" className="cursor-pointer hover:bg-red-400 w-full h-full flex items-center justify-center" onClick={handleDown}>
                    <div style={{transform:"translateY(10%)"}} className="flex flex-col justify-center items-center">
                        <CaretDownFill size="40"/>
                        <p>{downVotes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Vote = ({loggedIn}) => {
    let navigate = useNavigate();
    const [data, setData] = useState(null);
    useEffect(()=>{
        if (!loggedIn) navigate("/", {replace:true});
    });
    useEffect(()=>{
        async function readData(){
            const tempArr = [];
            const newData = await readDocument("post");
            newData.forEach(element=>{
                tempArr.push(element.data());
            })
            setData(tempArr);
        }
        readData();
    },[])
    return(
        <>
        <div className="p-4 bg-gray-200 border-2 border-gray-300 flex flex-col w-full lg:grid lg:grid-cols-3 lg:gap-4 min-h-screen">
            {
                data !== null?
                data.map((v,k)=>{
                    return <Card 
                        key={k} 
                        bigHeading={v.bigHeading} 
                        smallHeading={v.smallHeading} 
                        content={v.content}
                        upVotes={v.upVotes}
                        downVotes={v.downVotes}/>
                }):null
            }
        </div>
        <div id="create-post" style={{bottom:"30px", right:"30px"}} className="fixed">
            <Link to="/posts">
                <button className={ROUND_BUTTON_CLASS}>+</button>
            </Link>
        </div>
        </>
    )
}

export default Vote;