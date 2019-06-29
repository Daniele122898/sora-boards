import React from 'react';

interface Props {
    sorters:  Sorter[];
    data: any[];
    searchFilter: (el: any, search: string) => any;
    dataReturn: (data: any) => any;
    searchTextPlaceHolder?: string;
}

interface State {
    searchText: string;
    selectOption: string;
}

export interface Sorter {
    name: string;
    comparer: (firstEl: any, secondEl: any) => any;
}

class Filter extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            searchText: '',
            selectOption: props.sorters[0].name
        }
    }

    searchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        // change state
        this.setState(()=> ({
            searchText: search
        }));
        // change the data array
        const newData = this.props.data.filter((el) => {
            return this.props.searchFilter(el, search);
        });
        // return it to the parent in its changed state.
        this.props.dataReturn(newData);
    }

    selectChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        this.setState(()=> ({
            selectOption: selected
        }));
        // now update the list
        for (let i=0; i<this.props.sorters.length; i++) {
            const sort = this.props.sorters[i];
                if (sort.name.toLowerCase() === selected) {
                // do your comparisons and return new list
                this.props.data.sort(sort.comparer);
                this.props.dataReturn(this.props.data);
                break;
            }
        }
    }

    render() {
        return (
            <div className="input-group" style={{marginRight: "3.2rem"}}>
                <div className="input-group__item flex-grow-1">
                    <input 
                        type="text"
                        placeholder={this.props.searchTextPlaceHolder}
                        className="text-input"
                        value={this.state.searchText}
                        onChange={this.searchTextChange}
                    />
                </div>
                <div className="input-group__item">
                    <select
                        className="select"
                        value={this.state.selectOption}
                        onChange={this.selectChangeEvent}
                    >
                        {this.props.sorters.map((sorter, index) => (
                            <option
                                key={index} 
                                value={sorter.name.toLowerCase()}
                            >
                                {sorter.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

export default Filter;