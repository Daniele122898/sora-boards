import React from 'react';
import { ApplicationState, User } from '../../store';
import { AnyThunkDispatch } from '../../types';
import { getGlobalLeaderboard } from '../../actions/leaderActions';
import { connect } from 'react-redux';
import { ApiResponse } from '../../actions/index';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants/index';
import LoadingPage from './LoadingPage';
import Banner from '../Banner';
import LeaderboardComp from '../Leaderboard';
import InfoCard from '../InfoCard';

interface Props {
    leaderboard: User[];
    getLeaderboard: () => any;
}

interface State {
    error: string;
}

class GlobalLeaderboard extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            error: ''
        }
    }

    componentWillMount() {
        if (this.props.leaderboard.length == 0) {
            // fetch leaderboard
            this.props.getLeaderboard()
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
        if (this.props.leaderboard.length == 0 && !this.state.error) {
            return (<LoadingPage/>);
        } else if (this.state.error) {
            return (
                <Banner
                    red={true}
                >
                    <p className="red-banner__text">{this.state.error}</p>
                </Banner>
            );
        } else {
            return this.renderPage();
        }
    }

    renderPage = () => (
        <LeaderboardComp
            users={this.props.leaderboard}
            infoCardContent={
                <p>{"This Leaderboard is based on the "}
                <strong>{"EXP gained globally on Sora. "}</strong>
                {"This means users can write messages and "}
                <strong>{"gain EXP "}</strong>
                {"from those. Gaining EXP has a "}
                <strong>{"cooldown "}</strong>
                {"that will remain undisclosed. Spamming many and "}
                <strong>{"short messages also leads to less EXP gain "}</strong>
                {"thus good behaviour is favored!"}
                </p>
            }
        />
    );
    
    render() {
        return (
            <div>
                <PageHeader
                    upperTitle="Global"
                    lowerTitle="Leaderboard"
                    imageUrl={SORA_IMG}
                />
                {this.renderConditionally()}
            </div>
        );
    }

}

const mapStateToPorps = ({leaderState}: ApplicationState) => ({
    leaderboard: leaderState.globalLeader
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<{}>) => ({
    getLeaderboard: () => dispatch(getGlobalLeaderboard())
});

export default connect(mapStateToPorps, mapDispatchToProps)(GlobalLeaderboard);