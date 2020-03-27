import React from 'react';

import './pokegame.styles.css';

class Pokegame extends React.Component {
	state = {
		noOfPokemons: 5,
		isSubmit: false
	}
	handleFormSubmit = (event) => {
		event.preventDefault();
		this.setState({isSubmit:!this.state.isSubmit},()=>{
			this.props.handleTotalPokemon(this.state.noOfPokemons)
		})
	}
	handleFormChange = (event) => {
		this.setState({noOfPokemons: parseInt(event.target.value)})
	}
	
	componentDidUpdate(){
		const {humanWon,computerWon}=this.props;
		if(humanWon+computerWon===this.state.noOfPokemons && this.state.isSubmit){
			const winner = humanWon>computerWon?'Congratulations,You win the Poke Card Game.':'You lose it!, Try Again.';
			setTimeout(()=>{
				alert(winner)
				this.setState({
					noOfPokemons: 5,
					isSubmit:!this.state.isSubmit
				})
				const reset=true;
				this.props.resetState(reset);
				// this.props.fetchData(reset)
			},1000)
		}
	}
	render () {
		if(!this.state.isSubmit){
			return (
				<div className='poke-form'>
					<form onSubmit={this.handleFormSubmit} >
						<label className='poke-label' htmlFor='totalPokemon'>No of Pokemons</label>
						<input 
							className='poke-input'
							id='totalPokemon' 
							step='2' 
							min='5' 
							max='30' 
							type='number' 
							placeholder='5' 
							onChange={this.handleFormChange}
						/>
						<button className='poke-button'>Submit</button>
					</form>
				</div>
			)
		}else{
			const {humanWon,computerWon}=this.props;
			return (
				<div className='pokegame'>
					<div className={humanWon >computerWon ? 'winner':'looser'}>
						<h1>YOU Won: {humanWon}</h1>
						<hr />
					</div>
					<div className={humanWon <computerWon ? 'winner':'looser'}>
						<h1>COMPUTER Won: {computerWon}</h1>
						<hr />
					</div>
				</div>
			)
		}
	}
}

export default Pokegame;