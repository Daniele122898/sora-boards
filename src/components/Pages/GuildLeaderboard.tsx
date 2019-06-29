import React, { ReactChild } from 'react';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store/index';
import { AnyThunkDispatch } from '../../types/index';
import { getGuildLeaderboard } from '../../actions/leaderActions';
import { connect } from 'react-redux';
import { Leaderboard } from '../../store/index';
import { ApiResponse } from '../../actions/index';
import LoadingPage from './LoadingPage';
import Banner from '../Banner';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants';
import LeaderboardComp from '../Leaderboard';
import InfoCard from '../InfoCard';

interface MatchParams {
    guildId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
    leaderboard: Leaderboard | undefined;
    getLeaderboard: (guildId: string) => any;
}

interface State {
    error: string;
}

class GuildLeaderboard extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
    
        this.state = {
            error: ''
        }
        
    }

    componentWillMount() {
        // check if we have the leaderboard already in the state
        // if not fetch
        if (this.props.leaderboard == undefined) {
            // fetch
            this.props.getLeaderboard(this.props.match.params.guildId)
            .then((resp: ApiResponse) => {
                if (resp.error != undefined) {
                    this.setState(() => ({
                        error: resp.error ? resp.error : ''
                    }));
                }
            });
        }
    }

    renderConditionally = () => {
        if (this.state.error) {
          return this.renderPage(true);
        } else if (this.props.leaderboard == undefined) {
          return (<LoadingPage/>);
        } else {
          return this.renderPage(false);
        }
    }

    renderErrorMessage = (): ReactChild => (
        <Banner
          red={true}
        >
          <p className="red-banner__text">{this.state.error}</p>
        </Banner>
    );

    renderLeaderboard = (leaderboard: Leaderboard) => {
        return (
            <LeaderboardComp
                users={leaderboard.users}
                infoCardContent={
                    <p>
                        {"This Leaderboard is based on the "}
                        <strong>{"EXP gained in the specific guild. "}</strong> 
                        {"This means users can write messages and "}
                        <strong>gain EXP</strong>{" from those. "}
                        {"Gaining EXP has a "}<strong>cooldown</strong> 
                        {" that will remain undisclosed. Spamming many and "}
                        <strong>short messages also leads to less EXP gain</strong> 
                        {" thus good behaviour is favored!"}
                    </p>
                }
            >
                <h1>Role Rewards</h1>
                <InfoCard>
                    {leaderboard.roleRewards.map((role, index) => (
                        <div key={index}>
                            <h2 style={{margin: "0", fontWeight: 500}}>
                                Lvl. {role.levelReq}
                            </h2>
                            <strong style={{color: role.color}}>{role.name}</strong>
                            <br/>
                        </div>
                    ))}
                </InfoCard>
            </LeaderboardComp>
        );
    }

    renderPage = (error = false) => {
        
        const leader = this.props.leaderboard;
        const data: Leaderboard = {
            guildName: leader ? (leader.guildName ? leader.guildName : "Unknown") : "Unknown",
            guildImage: leader ? (leader.guildImage ? leader.guildImage: SORA_IMG) : SORA_IMG,
            users: leader ? leader.users : [],
            roleRewards: leader ? leader.roleRewards : []
        }
        
        return (
            <div>
              <PageHeader 
                upperTitle="Leaderboard" 
                lowerTitle={data.guildName}
                imageUrl={data.guildImage} 
              />
              {
                error ? this.renderErrorMessage() : 
                  this.renderLeaderboard(data)
              }
            </div>
          );
    }



    render() {
        return this.renderConditionally();
    }
}

const mapStateToPorps = ({leaderState}: ApplicationState, ownProps: Props) => ({
    leaderboard: leaderState.leaderboards.get(ownProps.match.params.guildId)
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<{}>) => ({
    getLeaderboard: (guildId: string) => dispatch(getGuildLeaderboard(guildId))
});

export default connect(mapStateToPorps, mapDispatchToProps)(GuildLeaderboard);