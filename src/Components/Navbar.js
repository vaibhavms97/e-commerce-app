import React, { Component } from 'react';
import './Navbar.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Login from './Login';
import { BiUserCircle } from 'react-icons/bi';
import Axios from 'axios'


class Navbar extends Component {
    constructor() {
        super()

        this.state = {
            value: '',
            displayComponent: 'home',
            isLoginPageOpned: false,
            logindetails: [],
            userName: '',
        }
        this.openLoginComponent = this.openLoginComponent.bind(this);
    }

    componentDidMount() {
        Axios.get('http://localhost:4000/login')
            .then(response => {
                this.setState({ logindetails: response.data },
                    () => {
                        let isLoggedIn = localStorage.getItem('username');
                        if (isLoggedIn) {
                            this.setState({ userName: isLoggedIn })
                            document.querySelector('.navUl').classList.toggle('logged')
                            this.props.dispatch({
                                type: 'isLogged',
                                value:true
                            })
                            this.props.dispatch({
                                type: 'userId',
                                userId: localStorage.getItem('user_token')
                            })
                        }
                    });
            })
            this.props.history.push('/home');
    }

    openMinimizedMenu() {
        document.querySelector('.minimizedMenu').style.display = 'flex';
        document.querySelector('.mdMenu').style.display = 'none';
        document.querySelector('.mdClose').style.display = 'block';
    }
    closeMinimizedMenu() {
        document.querySelector('.minimizedMenu').style.display = 'none';
        document.querySelector('.mdMenu').style.display = 'block';
        document.querySelector('.mdClose').style.display = 'none';
    }

    openLoginComponent() {
        this.setState({ isLoginPageOpned: true })
    }

    changeValue(e) {
        this.props.dispatch({
            type: 'Changevalue',
            value: e.target.value
        })
        this.props.dispatch({
            type: 'filterChange',
            value: true
        })
        if(e.keyCode === 13){
            this.props.history.push('/home')
        }
    }

    handleLogout(){
        this.props.dispatch({
            type: 'isLogged',
            value:false
        })
        this.props.dispatch({
            type:'displayComponent',
            componentName:'home'
        })
        document.querySelector('.navUl').classList.toggle('logged')
        localStorage.clear()
        this.props.history.push('/home')
        window.location = '/'
    }

    handleHomeComponent(){
        window.location = '/'
    }

    handleSearch(){
        this.props.history.push('/home')
    }

    render() {
        return (
            <div>
                <div className='navBar'>
                    <div className='logo' onClick={this.handleHomeComponent.bind(this)}>
                        <HiOutlineShoppingBag className='mallLogo' />
                        <span className='name'>Mall</span>
                    </div>
                    <div className='searchBar'>
                        <input type='text' id='search' onKeyUp={this.changeValue.bind(this)}></input>
                        <button onClick={() => this.handleSearch('search')}><AiOutlineSearch className='searchIcon' /></button>
                    </div>
                    <div className='navItems'>
                        <ul className='navUl'>
                            <li> <Link to='/home'> Home </Link> </li>
                            <li> <Link to='/cart'> Cart </Link> </li>
                            {this.props.isLoggedIn ?
                                <li>
                                    <div class="dropdown">
                                        <button class="dropbtn"><BiUserCircle className='userIcon'/>{ this.state.userName}</button>
                                        <div class="dropdown-content">
                                            <a href='/'>Profile</a>
                                            <a onClick={this.handleLogout.bind(this)} href='/'>Logout</a>
                                        </div>
                                    </div>
                                </li> :
                                <li className='login' onClick={this.openLoginComponent}> Login </li>}
                        </ul>
                    </div>
                    <div className='hamburgerMenu'>
                        <AiOutlineMenu className='mdMenu' onClick={this.openMinimizedMenu} />
                        <AiOutlineClose className='mdClose' onClick={this.closeMinimizedMenu} />
                    </div>
                </div>
                <div className='minimizedMenu'>
                    <div className='minNavItems'>
                        <ul>
                            <li> <Link to='/home'> Home </Link> </li>
                            <li> <Link to='/cart'> Cart </Link> </li>
                            <li onClick={this.openLoginComponent}> Login </li>
                        </ul>
                    </div>
                </div>
                <div>
                    {this.state.isLoginPageOpned && <Login />}
                    {this.props.displayComponent === 'home' && this.handleHomeComponent()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLogged.isLoggedIn,
        displayComponent: state.displayComponent.displayComponents
    }
}

export default withRouter(connect(mapStateToProps)(Navbar))

