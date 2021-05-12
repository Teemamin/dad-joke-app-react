import React,{Component}from 'react'
import './App.css';
import Joke from './Joke'
import axios from "axios"
import './JokeList.css'
import { v4 as uuidv4 } from 'uuid';



class JokeList extends Component{
    static defaultProps = {
        numofdefaultjokes : 10
    }
  constructor(){
    super()
    this.state ={
        //  JSON.parse get the jokes from localstorage if none return empty array
        jokes : JSON.parse(window.localStorage.getItem("jokes") || "[]"),
        isLoading : false
    }
    this.getJokes = this.getJokes.bind(this)
  }

 componentDidMount(){
    if(this.state.jokes.length === 0) this.getJokes()
  }


  async getJokes(){
    let collectedJokes = []
    while(collectedJokes.length < this.props.numofdefaultjokes){
        let res = await axios.get('https://icanhazdadjoke.com/', 
        {headers:{Accept: "application/json"}})

        collectedJokes.push({id:uuidv4(),joke:res.data.joke,votes:0})
    }
//get n copy all the prevstate and  jokes gotn bck frm the APi and update the current state with both
// combine them both into a new array
    this.setState(prevState=>({
        jokes:[...prevState.jokes, ...collectedJokes],
        isLoading : false
        
    })
    //it will wait till state is done being set, then set the local storage
    ,()=>window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
    )
 
  }

handleAddJokes =()=>{
    this.setState({isLoading:true},this.getJokes)
    //having this.getJokes() as a call back will ensure it gets called after the loading state is chngd
}

  handlevote = (id,delta)=>{
        this.setState(
            prevState=>({
                jokes: prevState.jokes.map(joke=>
                    joke.id === id ? {...joke, votes: joke.votes + delta}:joke
                )
            }),()=>window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
            //this will ensure we have the updated votes in the localstorage
        )
  }
 
  render(){
    if(this.state.isLoading){
        return(
            <div className="JokeList-spinner">
                <i className='far fa-8x fa-laugh fa-spin' />
                <h1 className="JokeList-title">Loading...</h1>
            </div>
        )
    }
      let jokes = this.state.jokes.map((joke,i)=>{
          return <Joke joke={joke.joke} key={i} votes={joke.votes} id={joke.id}
            upvote={()=>this.handlevote(joke.id,1)}
            downvote={()=>this.handlevote(joke.id,-1)}

          />
      })
     
    return (
      <div className="JokeList">
          <div className='JokeList-sidebar'>
          <h1 className="JokeList-title"><span>Dad</span> Jokes</h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
          <button className='JokeList-getmore' onClick={this.handleAddJokes}>
            Get more Jokes
          </button>
      </div>

      <div className="JokeList-jokes">
            {jokes}
      </div>
      </div>
    );
  }
  
}

export default JokeList;
