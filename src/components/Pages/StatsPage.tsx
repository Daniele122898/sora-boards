import React from 'react';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants/index';
import InfoCard from '../InfoCard';
import { ApplicationState, SoraStats } from '../../store/index';
import { AnyThunkDispatch } from '../../types';
import { getSoraStats } from '../../actions/statsActions';
import { connect } from 'react-redux';
import { ApiResponse } from '../../actions/index';
import LoadingPage from './LoadingPage';
import Banner from '../Banner';

interface Props {
    stats: SoraStats;
    getStats: () => any;
}

interface State {
    error: string;
}

class StatsPage extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            error: ''
        }
    }

    componentWillMount() {
        // if the ping is 0 we didnt get the stats yet
        if (this.props.stats.ping === 0) {
            this.props.getStats()
            .then((resp: ApiResponse) => {
                if (resp.error !== undefined) {
                    this.setState(() => ({
                        error: resp.error == undefined ? "" : resp.error
                    }));
                }
            });
        }
    }

    renderStats = () => (
        <div className="content-container split">
            <h1>Stats</h1>
            <InfoCard style={ { 
                    margin: "0",
                    width: "auto"
                }}>
                <div className="stats-wrapper">
                    <div className="stats-item">
                        <div className="stats-list">
                            <p><strong>Uptime:</strong></p>
                            <p><strong>Messages Received:</strong></p>
                            <p><strong>Commands Executed:</strong></p>
                            <p><strong>Ping:</strong></p>
                        </div>
                        <div className="stats-list">
                            <p>{this.props.stats.uptime}</p>
                            <p>{this.props.stats.messagesReceived}</p>
                            <p>{this.props.stats.commandsExecuted}</p>
                            <p>{this.props.stats.ping} ms</p>
                        </div>
                    </div>
                    <div className="stats-item">
                        <div className="stats-list">
                            <p><strong>Guilds:</strong></p>
                            <p><strong>Users:</strong></p>
                            <p><strong>Shards:</strong></p>
                            <p><strong>Version:</strong></p>
                        </div>
                        <div className="stats-list">
                            <p>{this.props.stats.guildCount}</p>
                            <p>{this.props.stats.userCount}</p>
                            <p>{this.props.stats.shardNum}</p>
                            <p>v {this.props.stats.version}</p>
                        </div>
                    </div>
                </div>
            </InfoCard>
        </div>
    );

    renderConditionally = () => {
        if (this.props.stats.ping == 0 && !this.state.error) {
            return (<LoadingPage/>)
        } else if (this.state.error) {
            return (
                <Banner
                    red={true}
                >
                    <p className="red-banner__text">Failed to get stats. Sora might be down!</p>
                </Banner>
            );
        } else {
            return this.renderStats();
        }
    }

    render() {
        return (
            <div>
                <PageHeader
                    upperTitle="Stats for"
                    lowerTitle="Sora"
                    imageUrl={SORA_IMG}
                />
                {this.renderConditionally()}
            </div>
        );
    }
}

const mapStateToProps = ({ soraStats }: ApplicationState) => ({
    stats: soraStats
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<{}>) => ({
    getStats: () => dispatch(getSoraStats())
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);