import './App.css';
import React,{Component} from 'react';
import Navbar from './Components/Navbar';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      login: false
    }
  }

  componentDidMount(){
    document.title = 'Mall'
  }
  
  render(){
    return (
      <div >
        <header>
        </header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> 
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <Navbar />
        {/* <Postproducts /> */}
      </div>
    );
  }
}

