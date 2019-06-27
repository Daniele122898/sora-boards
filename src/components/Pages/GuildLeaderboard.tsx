import React from 'react';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
    guildId: string;
}

interface Props extends RouteComponentProps<MatchParams> {

}

interface State {

}

class GuildLeaderboard extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
    
        this.state = {
        }
        
    }

    render() {
        return (
            <div>
                Leaderboard
            </div>
        );
    }
}

export default GuildLeaderboard;