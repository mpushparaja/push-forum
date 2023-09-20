import { useState }from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const signUp = () =>{
        fetch('http://localhost:4000/api/register', {
            method:"POST",
            body:JSON.stringify({
                email, password, username
            }),
            headers: {
				"Content-Type": "application/json",
			}
        })
        .then((res)=>res.json)
        .then((data: any) => {
            console.log(data);
            if (data.error_message) {
                alert(data.error_message);
            } else {
                alert("Account created successfully!");
                navigate("/");
            }
        })
        .catch((err) => console.error(err));

    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        signUp();
        console.log({ username, email, password });
        setEmail("");
        setUsername("");
        setPassword("");
    };
  return (
    <main className='register'>
            <h1 className='registerTitle'>Create an account</h1>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label id='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label id='email'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label id='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='registerBtn'>REGISTER</button>
                <p>
                    Have an account? <Link to='/'>Sign in</Link>
                </p>
            </form>
        </main>
  )
}