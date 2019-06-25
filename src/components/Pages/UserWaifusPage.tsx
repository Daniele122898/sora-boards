import React, { ReactChild } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState, UserWaifuApiResponse, Waifu } from '../../store';
import { AnyThunkDispatch } from '../../types';
import { getUserWaifus, ApiResponse } from '../../actions/waifuActions';
import LoadingPage from './LoadingPage';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants';
import Banner from '../Banner';
import WaifuList from '../WaifuList';
import Card, { getRarityStringFromInt } from '../Card';

interface MatchParams {
    userId: string;
}

interface Props extends RouteComponentProps<MatchParams>{
    userWaifus: UserWaifuApiResponse | undefined;
    getUserWaifus: (userId: string) => any;
}

interface State {
    error: string;
}

class UserWaifusPage extends React.Component<Props, State> {
    
    constructor(props: any) {
        super(props);
    
        this.state = {
          error: ''
        }
        
      }

    componentWillMount() {
        // check if userWaifus is undefined. If it is
        // we didnt fetch those waifus yet so we call a fetch
        if (this.props.userWaifus == undefined) {
            // fetch
            this.props.getUserWaifus(this.props.match.params.userId)
            .then((resp: ApiResponse) => {
                if (resp.error != undefined) {
                    // do error handling
                    this.setState(()=> ({
                        error: resp.error ? resp.error : ''
                    }));
                }
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

    waifuMapper = (waifu: Waifu): ReactChild => (
        <div className="card--float" key={waifu.id}>
          <Card
            imageUrl={waifu.imageUrl}
            name={waifu.name}
            rarity={getRarityStringFromInt(waifu.rarity)}
            id={waifu.id}
            enableIdFooter={true}
          />
        </div>
    );

    renderPage = (error = false) => {
        
        const user = this.props.userWaifus;
        const data: UserWaifuApiResponse = {
            success: user ? user.success : false,
            username: user ? user.username : "Unknown",
            avatarUrl: user ? user.avatarUrl : SORA_IMG,
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

    renderWaifus = (data: UserWaifuApiResponse): ReactChild => (
        data.waifus.length == 0 ? (
            <Banner
                red={false}
            >
                <p className="red-banner__text">This user does not have any waifus!</p>
            </Banner>
        ) : (
            <WaifuList
                waifus={data.waifus}
                waifuMapper={this.waifuMapper}
            />
        )
    );
    
    render() {
        return this.renderConditionally();
    }
}

const mapStateToProps = ({ waifuState }: ApplicationState, ownProps: any) => ({
    userWaifus: waifuState.userWaifus.get(ownProps.match.params.userId)
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<{}>) => ({
    getUserWaifus: (userId: string) => dispatch(getUserWaifus(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserWaifusPage);