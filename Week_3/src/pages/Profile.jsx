import PersonIcon from '@mui/icons-material/Person';
import FriendTiles from '../components/friendTiles';
import { getUser, updateUser } from '../profiles';
import { useAuth } from "../Auth";
import KeyValuePairsDisplay from '../components/keyValue';
import { useState } from 'react';

function Profile({ dimensions }) {
    const { setUser, user } = useAuth();
    const [currUser, setCurrUser] = useState(getUser(user));

    function removePair(key){
        const copyUser = {...currUser};
        delete copyUser['details'][key];
        
        updateUser(user, copyUser);
        setCurrUser(copyUser);
    }

    function addPair(key, value){
        const copyUser = {...currUser};
        copyUser['details'][key] = value;

        updateUser(user, copyUser);
        setCurrUser(copyUser);
    }


    return (
        <div class="home">
            <div class="Box">
                <h2 class="paddingBottom">{currUser['name']}</h2>
                <div class="columns">
                    <div class="columnSmall">
                        <PersonIcon style={{ fontSize: '15vw', color: 'var(--text-font)', paddingRight: '10px' }}/>
                    </div>
                    <div class="columnLarge">
                        <KeyValuePairsDisplay editable={true} data={currUser['details']} removePair={removePair} addPair={addPair}/>
                        <div class="profileBio">{currUser['bio']}</div>
                    </div>
                </div>
            </div>
            <div class="Friends paddingTop paddingBottom">
                <h2 class="paddingBottom paddingTop">Friends</h2>
                <FriendTiles friends={currUser['friends']} includeOnlyFriends={true}/>
            </div>
        </div>
    );
};
  
export default Profile;