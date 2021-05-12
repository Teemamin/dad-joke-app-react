import React,{Component}from 'react'
import './App.css';
import axios from 'axios'
import CardImage from './CardImage'
import CardDeck from './CardDeck'
import JokeList from './JokeList'

class App extends Component{
  constructor(){
    super()
    this.state ={
    }
  }

 
  render(){
    return (
      <div className="App">
        <JokeList/>
      </div>
    );
  }
  
}

export default App;
