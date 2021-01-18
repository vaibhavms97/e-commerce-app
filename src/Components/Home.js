import React, { Component } from 'react';
import './Home.css';
import Axios from 'axios';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineReload } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineCaretRight } from 'react-icons/ai'
import { connect } from 'react-redux';
import { FiCheckCircle } from 'react-icons/fi';
import Login from './Login';
import { VscChromeClose } from 'react-icons/vsc'
import Pagination from './Pagination';
import ProgressBar from './ProgressBar';


class Home extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            list: [],
            cartItems: [],
            brand: [],
            category: [],
            rating: [],
            userId: '',
            searchBrand: undefined,
            diplayComponents: undefined,
            name: [],
            description: [],
            filteredBrands: [],
            filteredCategories: [],
            uniqueBrands: [],
            uniqueCategories: [],
            isDisplayProgressBar: false
        }
        this.handleCart = this.handleCart.bind(this);
        this.addFilters = this.addFilters.bind(this);
    }


    componentDidMount() {
        this.setState({isDisplayProgressBar : true})
        Axios.get('http://localhost:4000/products')
            .then(response => {
                sessionStorage.setItem('products',response.data)
                this.setState({ products: response.data, isDisplayProgressBar: false },
                    () => {
                        console.log(this.state.products)
                        let isLoggedIn = localStorage.getItem('user_token');
                        if (isLoggedIn) {
                            Axios.get('http://localhost:4000/getUser?userId=' + isLoggedIn)
                                .then(response => {
                                    console.log(response.data['cart'])
                                    if (response.data['cart'] !== undefined) {
                                        this.setState({ cartItems: response.data.cart },
                                        () => {
                                            this.state.cartItems.map(product => {
                                                this.state.products.map((pro,index) => {
                                                    if(product._id === pro._id){
                                                        pro.cart = true;
                                                        let editProduct = this.state.products
                                                        editProduct.splice(index,1,pro)                                        
                                                        this.setState({ products: editProduct })
                                                    }
                                                    return 0;
                                                })
                                                return 0;
                                            })
                                        })
                                    }
                                })
                        }
                        let brands = this.state.products.map(product => product.brand);
                        const uniqueBrands = [...new Set(brands)];
                        this.setState({uniqueBrands: uniqueBrands})
                        const categories = this.state.products.map(product => product.category);
                        const uniqueCategories = [...new Set(categories)];
                        this.setState({uniqueCategories: uniqueCategories})
                    })
            })
    }

    handleCart(product) {
        if (!this.props.isLoggedIn) {
            this.setState({ diplayComponents: 'loginNote' })
        }
        else {
            product.cart = true;
            product.qantity = 1;
            this.setState({ cartItems: [...this.state.cartItems, product] },
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
    }

    addFilters(category, event) {
        let filters = this.state[category]
        let isPresent = false
        filters.map((filter, index) => {
            if (filter === event) {
                filters.splice(index, 1)
                isPresent = true
                this.setState({ [category]: filters })
                return filters
            }
            return 0
        })
        if (!isPresent){
            this.setState({ [category]: [...this.state[category], event] })
        }
        this.props.dispatch({
            type: 'filterChange',
            value: true
        })
        this.props.dispatch({
            type: 'currentPage',
            pageNum: 1
        })
    }


    filteredProducts(products) {
        let filters
        if(this.props.value !== ""){
            const name = [this.props.value]
            const description = [this.props.value]
            filters = {
                brand: this.state.brand,
                category: this.state.category,
                rating: this.state.rating,
                name: name,
                description: description
            }
        } else {
            filters = {
                brand: this.state.brand,
                category: this.state.category,
                rating: this.state.rating
            }
        }
        const filterKeys = Object.keys(filters);
        return products.filter(product => {
            return filterKeys.every(key => {
                if (!filters[key].length) return true;
                if (key === 'rating') return filters[key].find(filter => product[key] >= filter)
                if (key === 'name') return filters[key].find(filter => product[key].toLowerCase().includes(filter.toLowerCase()))
                if (key === 'description') return filters[key].find(filter => product[key].toLowerCase().includes(filter.toLowerCase()))
                else return filters[key].find(filter => filter.includes(product[key]))
            })
        })
    }

    changeSearchBrand(event) {
        this.setState({ searchBrand: event.target.value })
    }

    clearFilters() {
        let x = document.getElementsByClassName('checkbox');
        for (let i = 0; i < x.length; i++) {
            if (x[i].checked)
                x[i].checked = false;
        }
        this.setState({ brand: [], category: [], rating: [] });
        document.getElementById('brand').value = '';
        this.setState({ searchBrand: undefined })
    }

    ShowBrands() {
        document.querySelector('.showBrands').classList.toggle('expand');
        document.querySelector('.brandsArrow').classList.toggle('rotate');
    }

    showCategories() {
        document.querySelector('.showCategory').classList.toggle('expand');
        document.querySelector('.categoryArrow').classList.toggle('rotate');
    }

    showRatings() {
        document.querySelector('.showRating').classList.toggle('expand');
        document.querySelector('.ratingArrow').classList.toggle('rotate');
    }

    handleLoginComponent() {
        this.setState({ diplayComponents: 'login' })
    }

    handleHomeComponent() {
        this.setState({ diplayComponents: 'home' })
    }

    shownProducts(products) {
        let shownProducts = products;
        const pageLimit = 16;
        const offset = (this.props.currentPage - 1) * pageLimit;
        shownProducts = products.slice(offset, offset + pageLimit)
        return shownProducts
    }

    render() {
        let products = this.filteredProducts(this.state.products);
        let shownProducts = this.shownProducts(products)
        let productsLength = products.length
        const ratings = [5, 4, 3, 2, 1];
        let uniqueCategories = this.state.uniqueCategories;
        let uniqueBrands = this.state.uniqueBrands;
        return (
            <div className='home'>
                <div className='filters'>
                    <div className='filter'>
                        <h3>Filters</h3>
                        <span onClick={this.clearFilters.bind(this)}>
                            <AiOutlineReload className='clearFilter' />
                            Clear filters
                        </span>
                    </div>
                    <div className='categoryList' >
                        <h6 onClick={this.showCategories} className='categoryTitle'>Categories <AiOutlineCaretRight className='categoryArrow' /> </h6>
                        <div className='showCategory'>
                            <div className='categories'>
                                {uniqueCategories.map((category) => {
                                    return <div key={category} className='category'>
                                        <label >
                                            <input type='checkbox' className='checkbox' onClick={() => this.addFilters('category', category)}></input>
                                            <span className='categoryName'> {category} </span>
                                        </label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='brandList' >
                        <h6 onClick={this.ShowBrands} className='brandsTitle'>Brands <AiOutlineCaretRight className='brandsArrow' /> </h6>
                        <div className='showBrands'>
                            <input type='text' id='brand' placeholder='Search for brands' className='brandInput' onChange={this.changeSearchBrand.bind(this)}></input>
                            <button className='buttonSearch'> <AiOutlineSearch className='searchicon' />  </button>
                            <div className='brands'>
                                {uniqueBrands.filter(brand => {
                                    if (this.state.searchBrand === undefined) {
                                        return brand
                                    } else if (brand.toLowerCase().includes(this.state.searchBrand.toLowerCase())) {
                                        return brand
                                    }
                                    return '';
                                }).map((brand, index) => {
                                    return <div key={brand} className='brand'>
                                        <label >
                                            <input type='checkbox' className='checkbox' onClick={() => this.addFilters('brand', brand)}></input>
                                            <span className='brandName'> {brand} </span>
                                        </label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='ratingList' >
                        <h6 onClick={this.showRatings} className='ratingTitle'>Ratings <AiOutlineCaretRight className='ratingArrow' /> </h6>
                        <div className='showRating'>
                            <div className='ratings'>
                                {ratings.map((rating) => {
                                    return <div key={rating} className='rating'>
                                        <label >
                                            <input type='checkbox' className='checkbox' onClick={() => this.addFilters('rating', rating)}></input>
                                            <span className='ratingName'> {rating} star</span>
                                        </label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.isDisplayProgressBar === true && 
                    <ProgressBar />
                }
                <div >
                    <div className='products'>
                        {shownProducts.map((product, index) =>
                            <div className='product' key={index}>
                                <article>
                                    <header>
                                        <img className='productImage' src={product.image} alt='tv'></img>
                                    </header>
                                    <section>
                                        <div className='productName'>
                                            {product.name}
                                        </div>
                                        <div className='productDesc'>
                                            {product.description}
                                        </div>
                                    </section>
                                    <footer>
                                        <div className='productPrize'>
                                            <label className='price'> <span className='rupee'>₹</span> {product.price} </label>
                                            <label className='review'><svg className='star' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 16 16"><path fill="#fb7b09" fillRule="evenodd" d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"></path></svg> {product.rating} </label>
                                        </div>
                                        <div>
                                            {product.cart === undefined ?
                                                <button className='cart' onClick={() => this.handleCart(product)}>
                                                    <FiShoppingCart className='cartIcon' />
                                                Add to cart
                                            </button> :
                                                <button className='addedToCart'>
                                                    <FiCheckCircle className='cartIcon' />
                                                Added to cart
                                            </button>
                                            }
                                        </div>
                                    </footer>
                                </article>
                            </div>
                        )}
                    </div>
                    <div className='paginationDiv'>
                        {productsLength > 16 && <Pagination length={productsLength} />}
                    </div>
                </div>
                {
                    this.state.diplayComponents === 'loginNote' &&
                    <div className='loginNote'>
                        <div className='note'>
                            <VscChromeClose className='closeNote' onClick={this.handleHomeComponent.bind(this)} />
                            <div>
                                <p>Please Login to continue</p>
                            </div>
                            <div>
                                <button onClick={this.handleLoginComponent.bind(this)}>Login</button>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.diplayComponents === 'login' && <Login />
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        value: state.searchedValue.value,
        cart: state.cart,
        isLoggedIn: state.isLogged.isLoggedIn,
        userId: state.userId.userId,
        currentPage: state.currentPage.currentPage
    }
}

export default connect(mapStateToProps)(Home)