import React from 'react';

import './pokemon.styles.css';

import Pokedex from '../../component/pokedex/pokedex.component';
import Pokegame from '../../component/pokegame/pokegame.component';

class Pokemon extends React.Component {
	state={
		human:{
			pokemon:[]
		},
		computer:{
			pokemon:[]
		},
		humanWon:0,
		computerWon:0,
		pick:-1,
		activeComputerPokemonExp:0,
		isClick:true,
		reset:false
	}
	resetState(){
		this.setState({
			human:{
				pokemon:[]
			},
			computer:{
				pokemon:[]
			},
			humanWon:0,
			computerWon:0,
			pick:-1,
			activeComputerPokemonExp:0,
			isClick:true,
			reset:true
		},()=>console.log(this.state))
	}
	fetchData = async(reset) =>{
		if(reset){
			await this.resetState()
		}
		// console.log(reset)
		const newPokemons = [];
		for(let i=0;i<10;i++){
		const id = Math.floor(Math.random()*300+1)
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then(response =>{
				return response.json();
			})
			.then(data => {
				const {id,base_experience,name} = data;
				const newPokemon = {
					id ,
					base_experience,
					name,
					type: data.types[0].type.name,
					imgSrc: data.sprites.front_default
				}
				newPokemons.push(newPokemon);
				// console.log(newPokemons)
				if(newPokemons.length===10)
				this.setState({
					'human': {pokemon: newPokemons.splice(1,5)} ,
					'computer':{pokemon: [...newPokemons]}
				})
			})
			.catch(error=>{
				console.log(error)
			})
		}
	}
	activeComputerPokemon= async (idx)=>{
		if(idx>=0){
			const pokemonExp = this.state.computer.pokemon[idx];
			// console.log(idx)
			if(pokemonExp.base_experience){
				await this.setState({
					pick:idx,
					activeComputerPokemonExp:pokemonExp.base_experience,
					isClick: !this.state.isClick
				})
			}
		}
	}
	handleReset=()=>{
		this.setState({reset:false})
	}
	handleCompare = (playerExp) =>{
		// console.log(playerExp,this.state.activeComputerPokemonExp)
		if(playerExp > this.state.activeComputerPokemonExp){
			this.setState({
				humanWon: this.state.humanWon +1,
				isClick: !this.state.isClick
			})
		}else if(playerExp <= this.state.activeComputerPokemonExp){
			this.setState({
				computerWon: this.state.computerWon +1,
				isClick: !this.state.isClick
			})
		}else{
			alert('Equal')
		}
	}
	componentDidMount(){
		if(this.state.human.pokemon.length !== 5 && this.state.computer.pokemon.length !== 5){
			const reset=false;
			this.fetchData(reset)
		}
	}
	
	render() {
		// console.log(this.state)
		return (
			<div className='pokemon'>
				<div>
					<Pokegame 
					humanWon={this.state.humanWon}
					computerWon={this.state.computerWon}
					fetchData={this.fetchData}
					/>
				</div>
				<div className='player'>
					<div className='player1'>
						<Pokedex 
							player='human' 
							reset={this.state.reset}
							handleReset={this.handleReset}
							pokemon={this.state.human} 
							handleCompare={this.handleCompare}
							activeComputerPokemon={this.activeComputerPokemon}
						/>
					</div>
					<div>
						<Pokedex 
							player='computer' 
							reset={this.state.reset}
							pokemon={this.state.computer}
							handleReset={this.handleReset}
							handleCompare={this.handleCompare}
							activeComputerPokemon={this.activeComputerPokemon}
							isClick={this.state.isClick}
							pick={this.state.pick}
						/>
					</div>
				</div>
			</div>
		)
	}
} 

export default Pokemon;