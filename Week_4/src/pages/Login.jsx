import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Auth";
import { tryLogin } from '../profiles';
import { useState } from 'react';

function Login({ dimensions }) {
    const { setUser, user } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function doLogin(){
        if (tryLogin(username, password)){
            successfulLogin(username);
        }
    }

    const successfulLogin = (userID) => {
        setUser(userID);
        navigate("/profile");
    }

    return (
        <div class="home">
            <h2 class="paddingBottom">Login</h2>
            <div class="loginBox">
                <TextField
                    required
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <center><Button variant="contained" style={{maxWidth: '80px', minWidth: '80px'}} onClick={doLogin}>Login</Button></center>
            </div>
            <div class="paddingTop alignRight">Don't have an account yet? then <Button component={Link} to={"/signup"} variant="contained" style={{maxWidth: '100px', minWidth: '100px'}}>Sign Up</Button></div>
        </div>
    );
};
  
export default Login;