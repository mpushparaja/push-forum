import { useNavigate } from "react-router-dom";

export const Nav = () => {
    const navigate = useNavigate();
    const signOut =() =>{
        localStorage.removeItem("_id");
        // redirects to the login page
        navigate("/");
    }
  return (
    <nav className='navbar'>
            <h2>Push-forum</h2>
            <div className='navbarRight'>
                <button onClick={signOut}>Sign out</button>
            </div>
        </nav>
  )
}
