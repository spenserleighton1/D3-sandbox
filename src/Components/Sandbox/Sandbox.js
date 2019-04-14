import React, { Component } from 'react';
import { getCharacters  } from '../../services/fetch.js'
import mockChars from '../../mock-data/characters.js'
import mockHouses from '../../mock-data/houses.js'
import Viz from '../D3/Viz.js'
import './Sandbox.css';

class Sandbox extends Component {
  constructor() {
    super()
    this.state = {
      characters: mockChars,
      houses: {},
      charactersByHouse: {},
      charactersByBlood: {},
      toDraw: []
    }
  }

  componentDidMount() {
    // getCharacters()
      // .then(res => {
        this.setState({
          charactersByHouse: this.sort(mockChars, 'house'),
          charactersByBlood: this.sort(mockChars, 'bloodStatus'),
          houses: this.houseColors(mockHouses)
        })
      // }) 
  }

  handleClick = (e) => {
    e.preventDefault()
    let houseDots = [];

    let keys = Object.keys(this.state.charactersByHouse)    
    
    keys.forEach(house => {

      
      let houseLength = this.state.charactersByHouse[house];
      let dot = {
        color: this.state.houses[house] ? this.state.houses[house][0] : '',
        width: houseLength.length
      }    
      houseDots.push(dot)
    })    

    this.setState({
      toDraw: houseDots
    })
  }

  houseColors = (houses) => {    
    return houses.reduce((acc,item)=>{
      !acc[item.name] ? acc[item.name] = item.colors : acc[item.name] = item.colors
      return acc;
    },{})
  }


  sort = (characters, sortBy) => {
    return characters.reduce((acc, character) => {  
      !acc[character[sortBy]] ? acc[character[sortBy]] = [character.name] : acc[character[sortBy]].push(character.name)
      return acc
    },{})
  }


  render() {
    return (
      <div className="App">
      <button onClick={this.handleClick}>click</button>
      { this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
      </div>
    );
  }
}

export default Sandbox;
