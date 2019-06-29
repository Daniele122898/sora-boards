import React, { ReactChild } from 'react';
import SplitScreen from './SplitScreen';
import { Waifu } from '../store/index';
import Pager from './Pager';
import Filter, { Sorter } from './Filter';
import InfoCard from './InfoCard';

interface Props {
    waifus: Waifu[];
    waifuMapper: (waifu: Waifu) => ReactChild;
    infoCardContent: React.ReactNode;
    sorters?: Sorter[];
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
        return (el.name.toLowerCase().includes(search.toLowerCase()));
    }

    dataReturn = (waifus: Waifu[]) => {
        this.setState(()=> ({
            waifus
        }));
    }
    
    render() {
        const sorters = this.props.sorters == undefined ? [] : this.props.sorters;
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
                            }, {
                                name: "ID Descending", 
                                comparer: (first: Waifu, second: Waifu) => {
                                    return Number.parseInt(first.id) >= Number.parseInt(second.id) ? -1 : 1;
                                }
                            }, {
                                name: "ID Ascending", 
                                comparer: (first: Waifu, second: Waifu) => {
                                    return Number.parseInt(first.id) <= Number.parseInt(second.id) ? -1 : 1;
                                },
                            },
                            ...sorters
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
                  <InfoCard>
                   {this.props.infoCardContent}
                  </InfoCard>
                </div>
              </SplitScreen>
          );
    }
}

export default WaifuList;