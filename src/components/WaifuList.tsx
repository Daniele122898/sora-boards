import React, { ReactChild } from 'react';
import SplitScreen from './SplitScreen';
import { Waifu } from '../store/index';
import Pager from './Pager';

interface Props {
    waifus: Waifu[];
    waifuMapper: (waifu: Waifu) => ReactChild;
}

class WaifuList extends React.Component<Props> {
    render() {
        return (
            <SplitScreen
                splitFirst={80}
              >
                <div id="waifu-split" className="split">
                    <h1>Waifus</h1>
                    <Pager 
                      data={this.props.waifus}
                      pageModulo={12}
                      mapper={this.props.waifuMapper}
                    />
                </div>
        
                <div id="info-split" className="split">
                  <h1>Help</h1>
                </div>
              </SplitScreen>
          );
    }
}

export default WaifuList;