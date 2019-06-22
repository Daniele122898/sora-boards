import React, { ReactChild } from 'react';

interface Props {
    data: any[];
    pageModulo: number;
    mapper: (data: any) => ReactChild; 
}

interface State {
    currentPage: number;
    numPages: number;
}

class Pager extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            numPages: 1
        }
    }

    componentDidUpdate(prevProps: Props) {
        // nothing changed here
        if (prevProps.data && 
            this.props.data && 
            prevProps.data.length === this.props.data.length) return;
        if (prevProps.data == this.props.data) return;
        // else smth changed so we update
        const numPages = Math.ceil(this.props.data.length / this.props.pageModulo);
        const currentPage = this.state.currentPage > numPages ? 1 : this.state.currentPage;
        this.setState(() => ({
            currentPage,
            numPages
        }));
    }

    renderPageContent (): ReactChild[] {
        const toRender: ReactChild[] = [];
        const pageStart = (this.state.currentPage-1) * this.props.pageModulo;
        let pageEnd = pageStart + this.props.pageModulo;
        if (pageEnd > this.props.data.length) pageEnd = this.props.data.length;
        
        for (let i=pageStart; i<pageEnd; i++) {
            toRender.push(this.props.mapper(this.props.data[i]));
        }

        return toRender;
    }

    render() {
        return (
            <div>
                { this.props.data && (
                    this.renderPageContent()
                )
                }
            </div>
        )
    }
}

export default Pager;