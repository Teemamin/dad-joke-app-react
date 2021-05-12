import React,{Component}from 'react'
import './App.css';
import axios from 'axios'
import './Card.css'
class CardImage extends Component{


  render(){
    return (
      <div className="Card">
          <img src={this.props.image}/>
      </div>
    );
  }
  
}

export default CardImage;
