import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState, UserWaifuApiResponse } from '../../store';
import { AnyThunkDispatch } from '../../types';
import { getUserWaifus } from '../../actions/waifuActions';

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
        }
    }
    
    render() {
        return (
            <div>
                Waifu page
            </div>
        );
    }
}

const mapStateToProps = ({ waifuState }: ApplicationState, ownProps: any) => ({
    userWaifus: waifuState.userWaifus.get(ownProps.match.params.userId)
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<{}>) => ({
    getUserWaifus: (userId: string) => dispatch(getUserWaifus(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserWaifusPage);