import Grid from '@mui/material/Unstable_Grid2';
import PersonIcon from '@mui/icons-material/Person';
import { getUser, removeFriend, addFriend } from '../profiles';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import { useAuth } from "../Auth";
import { useState } from 'react';

function FriendTiles({ friends, includeOnlyFriends }) {
    const { setUser, user } = useAuth();
    const [currUser, setCurrUser] = useState(getUser(user));    
    const [currFriends, setCurrFriends] = useState(getUser(user)['friends']);

    function updateCurrUser(userOne, userTwo, op){
        if (op == "add"){
            addFriend(userOne, userTwo);
        }
        if (op === "remove"){
            removeFriend(userOne, userTwo);
        }

        const updatedUser = getUser(user);
        setCurrUser(updatedUser);
        setCurrFriends(updatedUser['friends']);
    }

    return (
        <Grid container spacing={2}>
            {friends.length == 0 ? 
            <Grid xs={12} sm={6}><div class="Box"><h3>No Friends Added!</h3></div></Grid>
            : friends.map((userID) => {
                const friendDetails = getUser(userID)
                if (!includeOnlyFriends || currFriends.includes(userID)){
                    return (<Grid xs={12} sm={6} key={userID}>
                        <div class="Box" key={userID}>
                            <div class="columns">
                                <div class="columnSmall">
                                    <PersonIcon style={{ fontSize: '18vh', color: 'var(--text-font)', paddingRight: '10px' }}/>
                                </div>
                                <div class="columnLarge">
                                    <Link to={"/user?userid=" + userID}><h3>{friendDetails['name']}</h3></Link>
                                    <div>{Object.entries(friendDetails['details']).map(([key, value]) => <div key={key}>{key}: {value}</div>)}</div>
                                    {userID != user ? 
                                    <div class="paddingTop">
                                        <Button 
                                            variant="contained"
                                            style={{maxWidth: '120px', minWidth: '120px'}}
                                            onClick={currFriends.includes(userID) ? (() => updateCurrUser(user, userID, 'remove')) : (() => updateCurrUser(user, userID, 'add')) }
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
                return null;
                }
            )}
        </Grid>
    );
};
  
export default FriendTiles;