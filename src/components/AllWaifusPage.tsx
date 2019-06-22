import React from 'react';
import { connect } from 'react-redux';
import Card, { getRarityStringFromInt } from './Card';
import PageHeader from './PageHeader';
import { SORA_IMG } from '../constants/index';
import SplitScreen from './SplitScreen';
import { ApplicationState, Waifu } from '../store/index';
import { AnyThunkDispatch } from '../types/index';
import { getAllWaifus, ApiResponse } from '../actions/waifuActions';
import LoadingPage from './LoadingPage';

interface Props {
  allwaifus: Waifu[];
  firstFetch: boolean;
  startGetAllWaifus(): any;
}

class AllWaifusPage extends React.Component<Props> {
  
  componentWillMount() {
    // check if we already fetched. if not then we fetch
    if (this.props.firstFetch) return;
    // fetch
    this.props.startGetAllWaifus().then((resp: ApiResponse) => {
      if (resp.error == undefined) return;
      // else handle error. Because otherwise it will just load lul
    });
  }
  
  renderConditionally = () => {
    if (this.props.allwaifus == undefined || 
      (this.props.allwaifus.length == 0 && !this.props.firstFetch)) {
      return this.renderLoader();
    } else {
      return this.renderPage();
    }
  }

  renderLoader = () => (
    <LoadingPage/>
  );

  renderPage = () => (
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
            {this.props.allwaifus.map(waifu => (
              <div className="card--float" key={waifu.id}>
                <Card
                  imageUrl={waifu.imageUrl}
                  name={waifu.name}
                  rarity={getRarityStringFromInt(waifu.rarity)}
                  id={waifu.id}
                  enableIdFooter={true}
                />
              </div>
            ))}
        </div>

        <div id="info-split" className="split">
          <h1>Help</h1>
        </div>
      </SplitScreen>
    </div>
  );

  render() {
    return this.renderConditionally();
  }
}

const mapStateToProps = ({waifuState}: ApplicationState) => ({
  allwaifus: waifuState.allWaifus,
  firstFetch: waifuState.firstFetch
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<{}>) => ({
  startGetAllWaifus: () => dispatch(getAllWaifus())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllWaifusPage);