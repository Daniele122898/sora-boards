import React, { ReactChild } from 'react';
import { connect } from 'react-redux';
import Card, { getRarityStringFromInt } from '../Card';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants/index';
import { ApplicationState, Waifu } from '../../store/index';
import { AnyThunkDispatch } from '../../types/index';
import { getAllWaifus, ApiResponse } from '../../actions/waifuActions';
import LoadingPage from './LoadingPage';
import Banner from '../Banner';
import WaifuList from '../WaifuList';
import WaifuImageModal from '../WaifuImageModal';

interface Props {
  allwaifus: Waifu[];
  firstFetch: boolean;
  startGetAllWaifus(): any;
}

interface State {
  error: string;
  modalOpen: boolean;
  clickedImageUrl: string;
}

class AllWaifusPage extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      error: '',
      modalOpen: false,
      clickedImageUrl: ''
    }
    
  }
  
  componentWillMount() {
    // check if we already fetched. if not then we fetch
    if (this.props.firstFetch) return;
    // fetch
    this.props.startGetAllWaifus().then((resp: ApiResponse) => {
      if (resp.error == undefined) return;
      // else handle error. Because otherwise it will just load lul
      this.setState(()=> ({
        error: resp.error ? resp.error : ''
      }));
    });
  }

  renderErrorMessage = (): ReactChild => (
    <Banner
      red={true}
    >
      <p className="red-banner__text">{this.state.error}</p>
    </Banner>
  )
  
  renderConditionally = () => {
    if (this.state.error) {
      return this.renderPage(true);
    } else if (this.props.allwaifus == undefined || 
      (this.props.allwaifus.length == 0 && !this.props.firstFetch)) {
      return this.renderLoader();
    } else {
      return this.renderPage(false);
    }
  }

  renderLoader = () => (
    <LoadingPage/>
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
        rarity={getRarityStringFromInt(waifu.rarity)}
        id={waifu.id}
        enableIdFooter={true}
      />
    </div>
  );

  renderPage = (error = false) => (
    <div>
      <PageHeader 
        upperTitle="All available" 
        lowerTitle="Waifus"
        imageUrl={SORA_IMG} 
      />
      {
        error ? this.renderErrorMessage() : 
          <div>
            <WaifuList
              waifus={this.props.allwaifus}
              waifuMapper={this.waifuMapper}
              infoCardContent={(
                <p>{"This shows all the Waifus that are available. You can get "+
                  "them by opening WaifuBoxes. "}
                  <strong>{"Each image is clickable to expand since some "+ 
                    "are cropped weird! "}</strong> 
                    {"The first row is the Name, the second the "+ 
                    "Rarity and the last shows the ID of the specific Waifu."}</p>
              )}
            />
            <WaifuImageModal 
                    modalOpen={this.state.modalOpen}
                    onModalClose={this.onModalClose}
                    imageUrl={this.state.clickedImageUrl}
            />
          </div>
      }
    </div>
  );

  onModalClose = () => {
    this.setState(() => ({
        modalOpen: false,
        clickedImageUrl: ''
    }));
  }

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