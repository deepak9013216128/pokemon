import React from 'react';

import { v4 as uuidv4 } from 'uuid';

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
		reset:false,
		totalPokemon: 0
	}
	handleReset=()=>{
		this.setState({reset:false})
	}
	handleTotalPokemon = (noOfPokemons) => {
		this.setState({totalPokemon: noOfPokemons*2},()=>{
			this.fetchData();
		})
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
		}
	}
	resetState = () => {
		this.setState({
			human:{pokemon:[]},
			computer:{pokemon:[]},
			humanWon:0,
			computerWon:0,
			pick:-1,
			activeComputerPokemonExp:0,
			isClick:true,
			reset:true,
			totalPokemon: 0
		})
	}
	fetchData = async(reset) =>{
		if(reset){
			await this.resetState();
		}
		const newPokemons = [];
		for(let i=0;i<this.state.totalPokemon;i++){
		const id = Math.floor(Math.random()*300+1)
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then(response =>{
				return response.json();
			})
			.then(data => {
				const {id,base_experience,name} = data;
				const newPokemon = {
					key: uuidv4() ,
					id: id,
					base_experience,
					name,
					type: data.types[0].type.name
				}
				newPokemons.push(newPokemon);
				if(newPokemons.length===this.state.totalPokemon)
				this.setState({
					'human': {pokemon: newPokemons.splice(1,this.state.totalPokemon/2)} ,
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
			if(pokemonExp.base_experience){
				await this.setState({
					pick:idx,
					activeComputerPokemonExp:pokemonExp.base_experience,
					isClick: !this.state.isClick
				})
			}
		}
	}
	
	componentDidMount(){
		const {human,computer,totalPokemon} = this.state;
		if(human.pokemon.length !== totalPokemon/2 && computer.pokemon.length !== totalPokemon/2){
			const reset=false;
			this.fetchData(reset)
		}
	}
	
	render() {
		// console.log(this.state)
		const pokedex = this.state.totalPokemon ?
			(
				<div className='player'>
					<div className='player1'>
						<Pokedex 
							player='human' 
							reset={this.state.reset}
							pokemon={this.state.human.pokemon}
							handleReset={this.handleReset}
							totalPokemon={this.state.totalPokemon}
							handleCompare={this.handleCompare}
							activeComputerPokemon={this.activeComputerPokemon}
						/>
					</div>
					<div className='player2'>
						<Pokedex 
							player='computer' 
							reset={this.state.reset}
							pokemon={this.state.computer.pokemon}
							handleReset={this.handleReset}
							totalPokemon={this.state.totalPokemon}
							handleCompare={this.handleCompare}
							activeComputerPokemon={this.activeComputerPokemon}
							isClick={this.state.isClick}
							pick={this.state.pick}
						/>
					</div>
				</div>
			):('')
					
		return (
			<div className='pokemon'>
				<div className='game'>
					<Pokegame 
						humanWon={this.state.humanWon}
						computerWon={this.state.computerWon}
						resetState={this.resetState}
						handleTotalPokemon={this.handleTotalPokemon}
					/>
				</div>
				{
					pokedex
				}
			</div>
		)
	}
} 

export default Pokemon;