import React, { Component } from 'react';
import Axios from 'axios';
import './Login.css';
import { VscChromeClose } from 'react-icons/vsc';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            logindetails: [],
            value: ''
        }
    }
    componentDidMount() {
        console.log(process.env.PORT);
        Axios.get('http://localhost:4000/login')
            .then(response => {
                this.setState({ logindetails: response.data });
        })
    }

    checkLoginDetails() {
        let givenUsername = document.getElementById('username').value;
        let givenPassword = document.getElementById('password').value;
        for (const value of this.state.logindetails) {
            if (value.username === givenUsername && value.password === givenPassword) {
                localStorage.setItem('user_token',value._id)
                this.props.dispatch({
                    type:'displayComponent',
                    componentName:'home'
                })
                this.props.history.push('/')
            }
        }
    }

    closeLoginPage(event){
        event.preventDefault();
        this.props.dispatch({
            type:'displayComponent',
            componentName:'home'
        })
        this.props.history.push('/')
    }

    register() {
        this.props.history.push('/register')
    }
    render() {
        return (
            <div className='loginPage'>
                <div className='loginContainer'>
                    <VscChromeClose className='closeIcon' onClick={this.closeLoginPage.bind(this)}  />
                    <div className='loginContents'>
                        <div>
                            <h3 className='heading'>Login</h3>
                        </div>
                        <p className='error'>{this.state.error}</p>
                        <div>
                            <label className='label'>Username:</label>
                        </div>
                        <div className='inputdiv'>
                            <input className='input' type='text' placeholder='Enter username' id='username'></input>
                        </div>
                        <div>
                            <label className='label password'>Password:</label>
                        </div>
                        <div className='inputdiv'>
                            <input className='input ' type='password' placeholder='Enter password' id='password'></input>
                        </div>
                        <div className='row login'>
                            <button id='button' className='btn' onClick={this.checkLoginDetails.bind(this)}>Login</button>
                        </div>
                        <div className='row register'>
                            <button id='button' className='btn' onClick={this.register.bind(this)}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(Login))