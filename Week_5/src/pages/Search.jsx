import { useState, useEffect } from "react";
import FriendTiles from "../components/friendTiles";
import { getAllUserIds } from "../profiles";
import { useAuth } from "../Auth";

function Search({ dimensions }) {
    const { setUser, user } = useAuth();
	const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        getAllUserIds(setAllUsers);
	}, []);

    return (
        <div class="home">
            <h2 class="paddingBottom">All Users</h2>
            <FriendTiles friends={allUsers} includeOnlyFriends={false}/>
        </div>
    );
};
  
export default Search;