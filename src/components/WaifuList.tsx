import React, { ReactChild } from 'react';
import SplitScreen from './SplitScreen';
import { Waifu } from '../store/index';
import Pager from './Pager';
import Filter from './Filter';

interface Props {
    waifus: Waifu[];
    waifuMapper: (waifu: Waifu) => ReactChild;
}

interface State {
    waifus: Waifu[];
}

class WaifuList extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            waifus: props.waifus
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.waifus.length != this.props.waifus.length) {
            this.setState(() => ({
                waifus: this.props.waifus
            }));
        }
    }
    
    searchFilter(el: Waifu, search: string) {
        return (el.name.includes(search));
    }

    dataReturn = (waifus: Waifu[]) => {
        this.setState(()=> ({
            waifus
        }));
    }
    
    render() {
        return (
            <SplitScreen
                splitFirst={80}
              >
                <div id="waifu-split" className="split">
                    <h1>Waifus</h1>
                    <Filter
                        sorters={[
                            { 
                                name: "Rarity Descending", 
                                comparer: (first: Waifu, second: Waifu) => {
                                    return first.rarity >= second.rarity ? -1 : 1;
                                }
                            }, {
                                name: "Rarity Ascending", 
                                comparer: (first: Waifu, second: Waifu) => {
                                    return first.rarity <= second.rarity ? -1 : 1;
                                }
                            }
                        ]}
                        data={this.props.waifus}
                        searchFilter={this.searchFilter}
                        dataReturn={this.dataReturn}
                        searchTextPlaceHolder="Waifu name to search..."
                    />
                    <Pager 
                      data={this.state.waifus}
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