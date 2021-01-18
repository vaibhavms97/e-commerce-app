import Axios from 'axios';
import React, { Component } from 'react';

export class Postproducts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products: []
        }
    }
    
    componentDidMount(){
        Axios.get('filteredProducts.json')
        .then(response => {
            this.setState({products: response.data},
            () => {
                this.state.products.map(product => {
                    Axios.post('http://localhost:5000/postProducts', product)
                    .then(response => {
                        console.log(response)
                    })
                })
            })
        })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Postproducts
