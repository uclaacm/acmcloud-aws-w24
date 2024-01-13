import Grid from '@mui/material/Unstable_Grid2';
import PersonIcon from '@mui/icons-material/Person';
import { getUser, removeFriend, addFriend, BLANK_USER, getUsers } from '../profiles';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import { useAuth } from "../Auth";
import { useState, useEffect } from 'react';

function FriendTiles({ people }) {
    const { setUser, user } = useAuth();
    const [currFriends, setCurrFriends] = useState(user['friends']);
    const [peopleDetails, setPeopleDetails] = useState([]);

    useEffect(() => {
        getUsers(people, (details) => {console.log(details); setPeopleDetails(details)});
    }, [people]);

    function updateCurrUser(userOne, userTwo, op){
        if (op == "add"){
            addFriend(userOne, userTwo, setUser);
            setCurrFriends(currFriends.concat([userTwo]))
        }
        if (op === "remove"){
            removeFriend(userOne, userTwo, setUser);
            setCurrFriends(currFriends.filter((friend) => friend != userTwo));
        }
    }

    return (
        <Grid container spacing={2}>
            {peopleDetails.length == 0 ? <Grid xs={12} sm={6}><div class="Box"><h3>No Friends Added!</h3></div></Grid>
            : peopleDetails.map((details) => {
                const userID = details['username'];
                return (<Grid xs={12} sm={6} key={userID}>
                    <div class="Box" key={userID}>
                        <div class="columns">
                            <div class="columnSmall">
                                    <PersonIcon style={{ fontSize: '18vh', color: 'var(--text-font)', paddingRight: '10px' }}/>
                            </div>
                            <div class="columnLarge">
                                <Link to={"/user?userid=" + userID}><h3>{details['name']}</h3></Link>
                                <div>{Object.entries(details['details']).map(([key, value]) => <div key={key}>{key}: {value}</div>)}</div>
                                {userID != user['username'] ? 
                                <div class="paddingTop">
                                    <Button 
                                        variant="contained"
                                        style={{maxWidth: '120px', minWidth: '120px'}}
                                        onClick={currFriends.includes(userID) ? (() => updateCurrUser(user['username'], userID, 'remove')) : (() => updateCurrUser(user['username'], userID, 'add')) }
                                    >
                                        {currFriends.includes(userID) ? <RemoveIcon/> : <AddIcon/>}&nbsp;&nbsp;Friend
                                    </Button>
                                </div>
                                : null}
                            </div>
                        </div>
                    </div>
                </Grid>)
                }
            )}
        </Grid>
    );
};
  
export default FriendTiles;