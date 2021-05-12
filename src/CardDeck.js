import React,{Component}from 'react'
import './App.css';
import axios from 'axios'
import CardImage from './CardImage'

class CardDeck extends Component{
  constructor(){
    super()
    this.state ={
      img : [],
      id_im : '34vn39ipquz3'
    }
    this.handleClick = this.handleClick.bind(this)
  }
 async componentDidMount(){
    let url = axios.get(`https://deckofcardsapi.com/api/deck/${this.state.id_im}/draw/`)
    let res = await url
    let apiImg = res.data.cards[0].image
    // console.log(res.data.cards)
    this.setState({img: [...this.state.img,apiImg]})
  }

 async  handleClick(){
    let url = axios.get(`https://deckofcardsapi.com/api/deck/${this.state.id_im}/draw/`)
    let res = await url
    let apiImg = res.data.cards[0].image
    this.setState(prevState=>({
      img: [...prevState.img,apiImg]}
    ))

  }
  render(){
    let crds = this.state.img.map(itm=>{
      // console.log(itm)
        return  <CardImage image ={itm}/>
    })
    return (
      <div className="App">
       
          <button onClick={this.handleClick}>add card</button>
          {crds}
      </div>
    );
  }
  
}

export default CardDeck;
