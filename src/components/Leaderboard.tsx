import React, { FunctionComponent } from 'react';
import { User } from '../store/index';
import LeaderboardEntry from './LeaderboardEntry';
import SplitScreen from './SplitScreen';
import InfoCard from './InfoCard';

interface Props {
    users: User[];
    infoCardContent: React.ReactNode;
}

const Leaderboard: FunctionComponent<Props>  = ({users, infoCardContent, children}) => (
    <SplitScreen
        splitFirst={80}
    >
        <div className="leaderboard-group split">
            <h1>Leaderboard</h1>
            <div className="list-group list-group-shadow">
                {users.map((user, index) => 
                    <LeaderboardEntry
                        user={user}
                        key={index}
                    />
                )}
            </div>
        </div>
        <div id="info-split" className="split">
            { children }
            <h1>Help</h1>
            <InfoCard>
                {infoCardContent}
            </InfoCard>
        </div>
    </SplitScreen>
);

export default Leaderboard;