import React, { Component } from 'react';
import './Pagination.css';
import { connect } from 'react-redux';
import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs'

export class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
            length: 1,
            previousPage: 1,
            currentPage: 1,
        }
    }

    componentDidMount(){
        this.props.dispatch({
            type: 'currentPage',
            pageNum: this.state.currentPage
        })
    }

    handleClick(event) {
        let currentPage = parseInt(event.target.id)
        this.setState({ previousPage: this.state.currentPage, currentPage: currentPage });
        this.props.dispatch({
            type: 'currentPage',
            pageNum: currentPage
        })
    }
    getCurrentPage(){
        if(this.props.filterChange === false){
            return this.state.currentPage
        }
        else { 
            this.setState({currentPage: 1},
            () =>{
                this.props.dispatch({
                    type: 'filterChange',
                    value: false
                })
                this.props.dispatch({
                    type: 'currentPage',
                    pageNum: 1
                })
            })
           
            return 1;
        }
    }

    handlePrev(){
        this.setState({currentPage: this.state.currentPage-1},
        () => {
            this.props.dispatch({
                type: 'currentPage',
                pageNum: this.state.currentPage
            })
        })
    }

    handleNext(){
        this.setState({currentPage: this.state.currentPage+1},
        () => {
            this.props.dispatch({
                type: 'currentPage',
                pageNum: this.state.currentPage
            })
        })
    }

    render() {
        let currentPage = this.getCurrentPage()
        let length = Math.ceil(this.props.length / 16)
        let startingNum;
        let endingNum;
        if (length > 5) {
            if (currentPage === 1 || currentPage === 2 || currentPage === 3) {

                startingNum = 1;
                endingNum = 5;
            } else if (currentPage === length - 1 || currentPage === length - 2 || currentPage === length) {
                startingNum = length - 4;
                endingNum = length;
            } else {
                startingNum = currentPage - 2
                endingNum = currentPage + 2
            }
        } else {
            startingNum = 1;
            endingNum = length
        }
        let shownNum = [];
        for (let y = startingNum; y <= endingNum; y++) {
            shownNum.push(y)
        }
        return (
            <div className='paginationPage'>
                <ul className='pageBar'>
                    <li><button disabled={this.state.currentPage === 1} onClick={this.handlePrev.bind(this)}><BsArrowLeft/></button></li>
                    {shownNum.map(number => {
                        if (currentPage === number) {
                            return <li key={number} id={number} className='currentPage' onClick={this.handleClick.bind(this)}>
                                {number}
                            </li>
                        } else {
                            return <li key={number} id={number} className='pageNumber' onClick={this.handleClick.bind(this)}>
                                {number}
                            </li>
                        }
                    })}
                    <li><button disabled={this.state.currentPage === length} onClick={this.handleNext.bind(this)}><BsArrowRight/></button></li>
                </ul>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filterChange: state.filterChange.filterChange
    }
}

export default connect(mapStateToProps)(Pagination)
