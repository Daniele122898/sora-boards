import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState, UserWaifuApiResponse } from '../../store';

interface Props {
    userWaifus: UserWaifuApiResponse | undefined;
}

class UserWaifusPage extends React.Component<Props> {
    

    componentWillMount() {
        // check if userWaifus is undefined. If it is
        // we didnt fetch those waifus yet so we call a fetch
        if (this.props.userWaifus == undefined) {
            // fetch
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
// props.match.params.inviteId;
const mapStateToProps = ({ waifuState }: ApplicationState, ownProps: any) => ({
    userWaifus: waifuState.userWaifus.get(ownProps.match.params.userId)
});

export default connect(mapStateToProps)(UserWaifusPage);