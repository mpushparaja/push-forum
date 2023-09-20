import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { useNavigate } from "react-router-dom";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";

export const Home = () => {
    const [thread, setThread] = useState("");
    const [threadList, setThreadList] = useState([]);
 const navigate = useNavigate();
    useEffect(()=>{
        const checkUser = ()=>{
            if(!localStorage.getItem("_id")){
                navigate("/")
            }
            else{
                //get all threads api call
                fetch("http://localhost:4000/api/all/threads")
					.then((res) => res.json())
					.then((data) => setThreadList(data.threads))
					.catch((err) => console.error(err));
            }
        }
        checkUser();
    },[navigate])

    //Create thread api call
    const createThread = ()=>{
        fetch("http://localhost:4000/api/create/thread",{
            method:"POST",
            body:JSON.stringify({
                thread,
                userId: localStorage.getItem("_id")
            }),
            headers:{
                "content-type":"application/json"
            }
        })
        .then ((res) => res.json())
        .then ((data : any)=>{
            setThreadList(data.threads);
        })
        .catch((err)=> console.error(err))
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        createThread();
        setThread("");
    };
  return (
    <>
<Nav />
<main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label id='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
                <div className='thread__container'>
                {threadList.map((thread: any) => (
                    <div className='thread__item' key={thread.id}>
                        <p>{thread.title}</p>
                        <div className='react__container'>
                            <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                            <Comments
                                numberOfComments={thread.replies.length}
                                threadId={thread.id}
                                title={thread.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
            </main>
</>
  )
}