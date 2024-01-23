import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";
import { trySignUp } from '../profiles';
import { useState, useCallback } from 'react';

function SignUp({ dimensions }) {
    const { setUser, user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const doSignUp = useCallback(
        (e) => {
            e.preventDefault();
            const newUser = {
                'username': username,
                'password': password,
                'name': name,
                'details': {},
                'friends': [],
                'bio': ""
            }
            trySignUp(newUser, successfulLogin);
        },
        [setUser, username, password, name]
    );

    const successfulLogin = (userDetails) => {
        setUser(userDetails);
        navigate("/profile");
    }

    return (
        <div class="home">
            <h2 class="paddingBottom">Sign Up</h2>
            <div class="loginBox">
                <TextField
                    required
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
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
                <center><Button variant="contained" style={{maxWidth: '100px', minWidth: '100px'}} onClick={doSignUp}>Sign Up</Button></center>
            </div>
        </div>
    );
};
  
export default SignUp;