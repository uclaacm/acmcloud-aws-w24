import PersonIcon from '@mui/icons-material/Person';
import FriendTiles from '../components/friendTiles';
import { getUser, BLANK_USER } from '../profiles';
import { useLocation } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';

//Hook to grab path url parameter
function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function User({ dimensions }) {
    let query = useQuery();
    const [pageUser, setPageUser] = useState(BLANK_USER);
    const [pageFriends, setPageFriends] = useState([]);

    useEffect(() => {
        getUser(query.get("userid"), ((details) => {console.log(details); setPageUser(details); setPageFriends(details['friends'])}));
    }, [query]);

    return (
        <div class="home">
            <div class="Box">
                <h2 class="paddingBottom">{pageUser['name']}</h2>
                <div class="columns">
                    <div class="columnSmall">
                        <PersonIcon style={{ fontSize: '15vw', color: 'var(--text-font)', paddingRight: '10px' }}/>
                    </div>
                    <div class="columnLarge">
                        <div class="profileDetails paddingBottom">{Object.entries(pageUser['details']).map(([key, value]) => <div>{key}: {value}</div>)}</div>
                        <div class="profileBio">{pageUser['bio']}</div>
                    </div>
                </div>
            </div>
            <div class="Friends paddingTop">
                <h2 class="paddingBottom paddingTop">Friends</h2>
                <FriendTiles people={pageFriends}/>
            </div>
        </div>
    );
};
  
export default User;