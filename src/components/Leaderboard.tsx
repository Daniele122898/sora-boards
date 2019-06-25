import React from 'react';
import { User } from '../store/index';
import LeaderboardEntry from './LeaderboardEntry';

const Leaderboard = ({users}: {users: User[]}) => (
    <div className="list-group">
        {users.map((user, index) => 
            <LeaderboardEntry
                key={index}
                user={user}
            />
        )}
    </div>
);

export default Leaderboard;