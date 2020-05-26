import React, { ReactChild } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {ApplicationState, UserWaifuApiResponse, Waifu, WaifuRarity} from '../../store';
import { AnyThunkDispatch } from '../../types';
import {getUserWaifus, getWaifuRarities} from '../../actions/waifuActions';
import LoadingPage from './LoadingPage';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants';
import Banner from '../Banner';
import WaifuList from '../WaifuList';
import Card, { getRarityStringFromInt } from '../Card';
import WaifuImageModal from '../WaifuImageModal';
import { ApiResponse } from '../../actions/index';

interface MatchParams {
    userId: string;
}

interface Props extends RouteComponentProps<MatchParams>{
    userWaifus: UserWaifuApiResponse | undefined;
    getUserWaifus: (userId: string) => any;
    startGetRarities(): any;
    rarities: WaifuRarity[];
}

interface State {
    error: string;
    modalOpen: boolean;
    clickedImageUrl: string;
}

class UserWaifusPage extends React.Component<Props, State> {
    
    constructor(props: any) {
        super(props);
    
        this.state = {
          error: '',
          modalOpen: false,
          clickedImageUrl: ''
        }
        
      }

    componentWillMount() {
        // check if userWaifus is undefined. If it is
        // we didnt fetch those waifus yet so we call a fetch
        if (this.props.userWaifus == undefined) {
            // fetch
            this.props.startGetRarities().then((resp: ApiResponse) => {
                if (resp.error != undefined) {
                    // handle error
                    this.setState(() => ({
                        error: resp.error ? resp.error : ''
                    }));
                    return;
                }

                // Else fetch waifus
                this.props.getUserWaifus(this.props.match.params.userId)
                    .then((resp: ApiResponse) => {
                        if (resp.error != undefined) {
                            // do error handling
                            this.setState(() => ({
                                error: resp.error ? resp.error : ''
                            }));
                        }
                    });

            });
        }
    }

    renderConditionally = () => {
        if (this.state.error) {
          return this.renderPage(true);
        } else if (this.props.userWaifus == undefined) {
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

    onWaifuClick = (imageUrl: string) => {
        this.setState(()=>({ modalOpen: true, clickedImageUrl: imageUrl }));
    }

    waifuMapper = (waifu: Waifu): ReactChild => (
        <div 
            className="card--float" 
            key={waifu.id} 
            onClick={() => { this.onWaifuClick(waifu.imageUrl)}}    
        >
          <Card
            imageUrl={waifu.imageUrl}
            name={waifu.name}
            rarity={getRarityStringFromInt(waifu.rarity, this.props.rarities)}
            id={waifu.id}
            enableIdFooter={true}
            count={waifu.count}
          />
        </div>
    );

    renderPage = (error = false) => {
        
        const user = this.props.userWaifus;
        const data: UserWaifuApiResponse = {
            username: user ? (user.username ? user.username : "Unknown") : "Unknown",
            avatarUrl: user ? (user.avatarUrl ? user.avatarUrl: SORA_IMG) : SORA_IMG,
            waifus: user ? user.waifus : []
        }
        
        return (
            <div>
              <PageHeader 
                upperTitle="Waifus of" 
                lowerTitle={data.username}
                imageUrl={data.avatarUrl} 
              />
              {
                error ? this.renderErrorMessage() : 
                  this.renderWaifus(data)
              }
            </div>
          );
    }

    onModalClose = () => {
        this.setState(() => ({
            modalOpen: false,
            clickedImageUrl: ''
        }));
    }

    renderWaifus = (data: UserWaifuApiResponse): ReactChild => (
        data.waifus.length == 0 ? (
            <Banner
                red={false}
            >
                <p className="red-banner__text">This user does not have any waifus!</p>
            </Banner>
        ) : (
            <div>
                <WaifuList
                    waifus={data.waifus}
                    waifuMapper={this.waifuMapper}
                    sorters={[
                        {
                            name: "Count Descending", 
                            comparer: (first: Waifu, second: Waifu) => {
                                const countFirst = first.count == undefined ? 1 : first.count;
                                const countSecond = second.count == undefined ? 1 : second.count;
                                return countFirst >= countSecond ? -1 : 1;
                            },
                        },
                        {
                            name: "Count Ascending", 
                            comparer: (first: Waifu, second: Waifu) => {
                                const countFirst = first.count == undefined ? 1 : first.count;
                                const countSecond = second.count == undefined ? 1 : second.count;
                                return countFirst <= countSecond ? -1 : 1;
                            },
                        }
                    ]}
                    infoCardContent={(
                        <p>{"This shows all the Waifus that this User has. "+
                            "You can get them by opening WaifuBoxes. "}
                            <strong>{"Each image is clickable to expand since "+
                            "some are cropped weird! "}</strong>
                            {"The first row is the Name, the second the Rarity, "+
                            "the third the count (how many of that waifu " + 
                            "he owns) and the last shows the ID of the specific Waifu."}
                        </p>
                    )}
                />
                <WaifuImageModal 
                    modalOpen={this.state.modalOpen}
                    onModalClose={this.onModalClose}
                    imageUrl={this.state.clickedImageUrl}
                />
            </div>
        )
    );
    
    render() {
        return this.renderConditionally();
    }
}

const mapStateToProps = ({ waifuState }: ApplicationState, ownProps: any) => ({
    userWaifus: waifuState.userWaifus.get(ownProps.match.params.userId),
    rarities: waifuState.rarities,
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<{}>) => ({
    getUserWaifus: (userId: string) => dispatch(getUserWaifus(userId)),
    startGetRarities: () => dispatch(getWaifuRarities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserWaifusPage);
