import React from 'react';
import { connect } from 'react-redux';
import PageHeader from './PageHeader';
import { SORA_IMG } from '../constants/index';
import SplitScreen from './SplitScreen';
import { ApplicationState, Waifu } from '../store/index';

interface Props {
  allwaifus: Waifu[];
  firstFetch: boolean;
}

class AllWaifusPage extends React.Component<Props> {
  
  componentWillMount() {
    // check if we already fetched. if not then we fetch
    if (this.props.firstFetch) return;
    // fetch
    
  }
  
  render() {
    return (
      <div>
        <PageHeader 
          upperTitle="All available" 
          lowerTitle="Waifus"
          imageUrl={SORA_IMG} 
        />
        <SplitScreen
          splitFirst={80}
        >
          <div id="waifu-split" className="split">
              <h1>Waifus</h1>
          </div>

          <div id="info-split" className="split">
            <h1>Help</h1>
          </div>
        </SplitScreen>
      </div>
    );
  }
}

const mapStateToProps = ({waifuState}: ApplicationState) => ({
  allwaifus: waifuState.allWaifus,
  firstFetch: waifuState.firstFetch
});

export default connect(mapStateToProps)(AllWaifusPage);