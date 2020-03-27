import React from 'react';

import './pokedex.styles.css';

import Pokecard from '../pokecard/pokecard.component';

class Pokedex extends React.Component {
	state={
		picked:Array.from(Array(this.props.totalPokemon/2).keys()),
		pick: -1
	}
	componentDidUpdate(){
		const {pokemon,reset,player,totalPokemon,isClick} = this.props;
		if(reset){
			this.setState({
				picked:Array.from(Array(totalPokemon/2).keys()),
				pick: -1
			},()=>{
				this.props.handleReset()
			})
		}
		if(player==='computer' && this.state.picked.length >0 && pokemon.length===totalPokemon/2 && isClick){
			setTimeout(()=>{
				let idx= -1;
				if(this.props.player==='computer' && this.props.isClick){
					idx = Math.floor(Math.random()*this.state.picked.length)
					// console.log(idx)
					const pick =this.state.picked[idx]
					this.setState({
						picked:this.state.picked.filter(e=> e!==this.state.picked[idx]),
						pick: idx
					},()=>{
						this.props.activeComputerPokemon(pick);
					})
				}
			},10)
		}
	}
	render(){
		const {pokemon,player,pick,handleCompare} = this.props;
		return (
			<div className='pokedex'>
				{
					pokemon.map( (p,idx) => 
						<Pokecard 
							key={p.key} 
							{...p} 
							player={player}
							isActive={idx===pick} 
							handleCompare={handleCompare}
						/>
					)
				}
			</div>
		)
	}
}

export default Pokedex;