import { connect } from 'react-redux';
import React, { Component } from 'react';
import Axios from 'axios';
import './Cart.css'
import Login from './Login';
import ProgressBar from './ProgressBar';
// import emptyCart from '..Images/empty.png'

export class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cartItems: [],
            displayComponents: undefined,
            isDisplayProgressBar: false
        }
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        this.setState({ isDisplayProgressBar: true })
        if (this.props.userId) {
            Axios.get('http://localhost:4000/getUser?userId=' + this.props.userId)
                .then(response => {
                    this.setState({ isDisplayProgressBar: false })
                    console.log(response)
                    if (response.data.cart !== undefined && response.data.cart.length !== 0) {
                        this.setState({ cartItems: response.data.cart })
                    }
                })
        }

    }

    handleHomeComponent() {
        window.location = '/home'
    }

    removeItem(index) {
        let cartItems = this.state.cartItems;
        cartItems.splice(index, 1);
        this.setState({ cartItems: cartItems },
            () => {
                const details = {
                    products: this.state.cartItems,
                    userId: this.props.userId
                }
                Axios.post('http://localhost:4000/addToCart', details)
                    .then(response => {
                        console.log(response)
                    })
            })
    }

    handleLoginComponent() {
        this.setState({ displayComponents: 'login' })
    }

    render() {
        let items = this.state.cartItems.length;
        let total = 0
        this.state.cartItems.map(product => {
            total = product.price + total
            return 0;
        })
        return (
            <div className='cartPage'>
                { this.state.isDisplayProgressBar === true ? <ProgressBar /> :
                    <div>
                        {
                            this.props.isLoggedIn && this.state.cartItems.length === 0 &&
                            <div className='emptyCart'>
                                <img src='https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='emptyCart'></img>
                                <div className='empty'>Your cart is empty!</div>
                                <div className='addItems'>Add items to it now.</div>
                                <button onClick={this.handleHomeComponent.bind(this)}>Shop now</button>
                            </div>
                        }
                        {
                            !this.props.isLoggedIn &&
                            <div className='emptyCart'>
                                <img src='https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='emptyCart'></img>
                                <div className='empty'>Please login to see your cart</div>
                                <button onClick={this.handleLoginComponent.bind(this)}>Login</button>
                            </div>
                        }
                        {
                            this.state.cartItems.length !== 0 &&
                            <div className='inCart'>
                                <div className='cartItems'>
                                    <div className='cartHeading'>
                                        <h5>My Cart ({items})</h5>
                                    </div>
                                    {this.state.cartItems.map((product, index) => {
                                        return <div className='cartProduct'>
                                            <div className='image'>
                                                <img src={product.image} alt={product.image}></img>
                                            </div>
                                            <div className='aboutProduct'>
                                                <h4>{product.name}</h4>
                                                <p>{product.description}</p>
                                                <p> <span className='rupee'>₹</span> {product.price} </p>
                                                <button className='removeItem' onClick={() => this.removeItem(index)}>Remove</button>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <div className='priceNote'>
                                    <div className='priceHeading'>
                                        <h5>Price Details</h5>
                                    </div>
                                    <div className='aboutPrice'>
                                        <div className='priceDetails'>
                                            <div className='totalPrice'>
                                                <p>Price ({items} items)</p>
                                                <p><span className='rupee'>₹</span> {total}</p>
                                            </div>
                                            <div className='discountPrice'>
                                                <p> Discount </p>
                                                <p> <span className='rupee'>₹</span> {total / 10} </p>
                                            </div>
                                            <div className='deliveryCharges'>
                                                <p> Delivery charges</p>
                                                <p> Free </p>
                                            </div>
                                        </div>
                                        <div className='total'>
                                            <p> Total</p>
                                            <p> <span className='rupee'>₹</span> {total - total / 10} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <div>
                            {this.state.displayComponents === 'login' && <Login />}
                        </div>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLogged.isLoggedIn,
        userId: state.userId.userId
    }
}

export default connect(mapStateToProps)(Cart)
