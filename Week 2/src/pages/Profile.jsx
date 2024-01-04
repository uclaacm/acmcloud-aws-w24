import PersonIcon from '@mui/icons-material/Person';
import FriendTiles from '../components/friendTiles';
import { getUser, setUser } from '../profiles';
import { useAuth } from "../Auth";
import KeyValuePairsDisplay from '../components/keyValue';
import { useState } from 'react';

function Profile({ dimensions }) {
    const { setUser, user } = useAuth();
    const [currUser, setCurrUser] = useState(getUser(user));
    const [currDetails, setCurrDetails] = useState(getUser(user)['details'])

    function removePair(key){
        const copyDetails = currDetails
        delete copyDetails[key]
        
        setUser(user, currUser['details']);
        
        setCurrDetails(copyDetails);
        setCurrUser(getUser(user));
        console.log(currDetails);
    }

    function addPair(key){

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
                        <KeyValuePairsDisplay editable={true} data={currDetails} removePair={removePair} addPair={addPair}/>
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