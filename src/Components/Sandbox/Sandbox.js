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
      toDraw: [],
      houseColors: {
        Ravenclaw: { primary: '#002D5C', bronze: '#93948D'},
        Gryffindor: { primary: '#640102', secondary: '#C59106'},
        Hufflepuff: { primary: '#AA770A', secondary: '#030209'},
        Slytherin: { primary: '#003101', secondary: '#626263'},
        undefined: { primary: 'black', secondary: 'black' }
      }
    }
  }

  componentDidMount() {
    // getCharacters()
      // .then(res => {
        this.setState({
          charactersByHouse: this.sort(mockChars, 'house'),
          charactersByBlood: this.sort(mockChars, 'bloodStatus')
          // houses: this.houseColors(mockHouses)
        })
      // }) 
  }

  handleClick = (item) => {
    this.setState({
      toDraw: [...this.state.toDraw, ...this.createDots(this.state.charactersByHouse)]
    })
  }

  createDots = (objToDot, color = 'black') => {
    let dots = [];

    let keys = Object.keys(objToDot)    

    console.log('item', objToDot);
    keys.forEach(item => {
      
      let length = (objToDot[item].length * 3);
      let dot = {
        color: this.state.houseColors[item] ? this.state.houseColors[item].primary : '',
        borderColor: this.state.houseColors[item] ? this.state.houseColors[item].secondary : '',
        width: length 
      }    
      dots.push(dot)
    })  

    return dots;
  }

  // houseColors = (houses) => {    
  //   return houses.reduce((acc,item)=>{
  //     !acc[item.name] ? acc[item.name] = item.colors : acc[item.name] = item.colors
  //     return acc;
  //   },{})
  // }


  sort = (characters, sortBy) => {
    return characters.reduce((acc, character) => {  
      !acc[character[sortBy]] ? acc[character[sortBy]] = [character.name] : acc[character[sortBy]].push(character.name)
      return acc
    },{})
  }


  render() {
    return (
      <div className="App">
      <button onClick={ this.handleClick }>click</button>
      { this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
      </div>
    );
  }
}

export default Sandbox;
