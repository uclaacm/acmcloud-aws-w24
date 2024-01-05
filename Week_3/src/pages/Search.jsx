import FriendTiles from "../components/friendTiles";
import { getAllUserIds } from "../profiles";
import { useAuth } from "../Auth";

function Search({ dimensions }) {
    const { setUser, user } = useAuth();

    return (
        <div class="home">
            <h2 class="paddingBottom">All Users</h2>
            <FriendTiles friends={getAllUserIds()} includeOnlyFriends={false}/>
        </div>
    );
};
  
export default Search;