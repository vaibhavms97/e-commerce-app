import Axios from 'axios';
import React, { Component } from 'react';
import './Register.css';
import { VscChromeClose } from 'react-icons/vsc'
import { connect } from 'react-redux';


class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            loginDetails: [],
            error: ''
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:4000/login')
            .then(response => {
                this.setState({ loginDetails: response.data });
            })
    }

    register() {
        let givenUsername = document.getElementById('user').value;
        let givenPassword = document.getElementById('pass').value;
        let ConfirmPassword = document.getElementById('confirmPassword').value;
        let valid = true
        Object.values(this.state.loginDetails).map(value => {
            if (value.username === givenUsername) {
                valid = false
                return this.setState({ error: 'User already exists' })
            }
            return 0;
        })
        if (givenPassword !== ConfirmPassword) {
            this.setState({ error: 'Passwords does not matched' })
            valid = false;
        } else if (valid === true) {
            console.log('hey')
            let logindetails = {
                username: givenUsername,
                password: givenPassword
            }
            Axios.post('http://localhost:4000/postLoginDetails', logindetails)
                .then(response => {
                    console.log(response)
                    localStorage.setItem('user_token',response.data.key);
                    localStorage.setItem('username',givenUsername)
                    console.log(response.data);
                    this.props.dispatch({
                        type:'displayComponent',
                        componentName:'home'
                    })
                    this.props.history.push('/')
            })
            
            
        }

    }

    closeRegisterPage(){
        this.props.dispatch({
            type:'displayComponent',
            componentName:'home'
        })
        window.location = '/home'
    }

    changeValue(e){
        if(e.keyCode === 13){
            this.register();
        }
    }

    render() {
        return (
            <div className='registerPage'>
                <div className='registerContainer'>
                    <VscChromeClose className='closeIcon' onClick={this.closeRegisterPage.bind(this)}  />
                    <div className='contents'>
                        <div>
                            <h3 className='heading'>Register</h3>
                        </div>
                        <p className='error'>{this.state.error}</p>
                        <div>
                            <label className='label'>Username:</label>
                        </div>
                        <div className='inputdiv'>
                            <input className='input' type='text' placeholder='Enter username' id='user'></input>
                        </div>
                        <div>
                            <label className='label password'>Password:</label>
                        </div>
                        <div className='inputdiv'>
                            <input className='input ' type='password' placeholder='Enter password' id='pass'></input>
                        </div>
                        <div>
                            <label className='label confirmPassword'>Confirm Password:</label>
                        </div>
                        <div className='inputdiv confirmPasswordinp'>
                            <input className='input ' type='password' placeholder='Confirm password' id='confirmPassword' onKeyUp={this.changeValue.bind(this)}></input>
                        </div>
                        <div className='row login'>
                            <button id='button' className='btn' onClick={this.register.bind(this)}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Register)