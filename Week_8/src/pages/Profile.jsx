import PersonIcon from '@mui/icons-material/Person';
import FriendTiles from '../components/friendTiles';
import { updateUser } from '../profiles';
import { useAuth } from "../Auth";
import KeyValuePairsDisplay from '../components/keyValue';

function Profile({ dimensions }) {
    const { setUser, user } = useAuth();

    function removePair(key){
        const copyUser = {...user};
        delete copyUser['details'][key];
        
        updateUser(copyUser);
        setUser(copyUser);
    }

    function addPair(key, value){
        const copyUser = {...user};
        copyUser['details'][key] = value;

        updateUser(copyUser);
        setUser(copyUser);
    }

    return (
        <div class="home">
            <div class="Box">
                <h2 class="paddingBottom">{user['name']}</h2>
                <div class="columns">
                    <div class="columnSmall">
                        <PersonIcon style={{ fontSize: '15vw', color: 'var(--text-font)', paddingRight: '10px' }}/>
                    </div>
                    <div class="columnLarge">
                        <KeyValuePairsDisplay editable={true} data={user['details']} removePair={removePair} addPair={addPair}/>
                        <div class="profileBio">{user['bio']}</div>
                    </div>
                </div>
            </div>
            <div class="Friends paddingTop paddingBottom">
                <h2 class="paddingBottom paddingTop">Friends</h2>
                <FriendTiles people={user['friends']}/>
            </div>
        </div>
    );
};
  
export default Profile;