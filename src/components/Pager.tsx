import React, { ReactChild, ChangeEvent } from 'react';
import { 
    IoMdArrowDropleft,
    IoMdArrowDropright,
    IoMdSkipBackward,
    IoMdSkipForward,
    IoMdArrowDroprightCircle
} from 'react-icons/io'

interface Props {
    data: any[];
    pageModulo: number;
    mapper: (data: any) => ReactChild; 
}

interface State {
    currentPage: number;
    numPages: number;
    pageSelection: string;
}

class Pager extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSelection: '1',
            numPages: props.data ? Math.ceil(this.props.data.length / this.props.pageModulo) : 1
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // check for page change
        if (prevState.currentPage != this.state.currentPage) {
            this.setState((state)=> ({
                pageSelection: state.currentPage.toString()
            }))
        }
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

    renderPageContent = (): ReactChild[] => {
        const toRender: ReactChild[] = [];
        const pageStart = (this.state.currentPage-1) * this.props.pageModulo;
        let pageEnd = pageStart + this.props.pageModulo;
        if (pageEnd > this.props.data.length) pageEnd = this.props.data.length;
        
        for (let i=pageStart; i<pageEnd; i++) {
            toRender.push(this.props.mapper(this.props.data[i]));
        }

        return toRender;
    }

    skipToFirstPage = () => {
        this.setState(() => ({
            currentPage: 1
        }));
    }

    skipToLastPage = () => {
        this.setState((state) => ({
            currentPage: state.numPages
        }))
    }

    goPageBack = () => {
        if (this.state.currentPage == 1) return;
        this.setState((state) => ({
            currentPage: state.currentPage -1
        }));
    }

    goPageForward = () => {
        if (this.state.currentPage == this.state.numPages) return;
        this.setState((state) => ({
            currentPage: state.currentPage + 1
        }));
    }

    goToPage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const num = Number.parseInt(this.state.pageSelection);
        if (num == undefined || Number.isNaN(num) || num < 1 || num > this.state.numPages) return;
        this.setState(()=> ({
            currentPage: num,
            pageSelection: num.toString()
        }));
    }

    onPageSelectionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value.trim();
        this.setState(() => ({
            pageSelection: val
        }));
    }

    renderPageSelection = (): ReactChild => {
        return (
            <form onSubmit={this.goToPage}>
                <span>page</span>
                <input 
                    type="number" 
                    value={this.state.pageSelection}
                    placeholder={this.state.pageSelection}
                    onChange={this.onPageSelectionChange}
                    max={this.state.numPages}
                    min={1}
                />
                <span>of <span>{this.state.numPages.toString()}</span></span>
                <button className="pager-footer__button">
                    <IoMdArrowDroprightCircle />
                </button>
            </form>
        )
    }

    renderPagerFooter = (): ReactChild => {
        return (
            <div className="pager-footer">
               <button 
                    className="pager-footer__button" 
                    onClick={this.skipToFirstPage} 
                >
                    <IoMdSkipBackward/>
                </button>
                <button 
                    className="pager-footer__button" 
                    onClick={this.goPageBack}
                >
                    <IoMdArrowDropleft/>
                </button>
                {this.renderPageSelection()}
                <button 
                    className="pager-footer__button" 
                    onClick={this.goPageForward}
                >
                    <IoMdArrowDropright/>
                </button> 
                <button 
                    className="pager-footer__button" 
                    onClick={this.skipToLastPage}
                >
                    <IoMdSkipForward/>
                </button> 
            </div>
        )
    }

    render() {
        return (
            <div className="pager-container">
                <div className="pager-content">
                    { this.props.data && (
                        this.renderPageContent()
                    )
                    }
                </div>
                <div className="pager-footer-container">
                    { this.renderPagerFooter() }
                </div>
            </div>
        )
    }
}

export default Pager;