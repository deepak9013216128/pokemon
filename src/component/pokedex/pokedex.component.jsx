import React from 'react';

import './pokedex.styles.css';

import Pokecard from '../pokecard/pokecard.component';

class Pokedex extends React.Component {
	state={
		picked:[0,1,2,3,4],
		pick: -1
	}
	componentDidMount(){

		// const {pokemon} = this.props.pokemon;
		// console.log(this.props)
		// let idx= -1;
		// if(this.props.player==='computer' && this.props.isClick){
		// 	idx = Math.floor(Math.random()*this.state.picked.length)
		// 	console.log("pick",idx)
		// 	// console.log(this.state,idx)
		// 	if(this.state.picked.length >0 && pokemon.length!==5){
		// 		this.setState({
		// 			picked:this.state.picked.filter(e=> e!==this.state.picked[idx]),
		// 			pick: idx
		// 		})
		// 		// console.log(this.state.picked.filter(e=> e!==this.state.picked[pick]))
		// 	}
		// }
		
	}

	render(){
		// console.log(this.props)
		if(this.props.reset){
			this.setState({
				picked:[0,1,2,3,4],
				pick: -1
			},()=>{
				this.props.handleReset()
				// console.log(this.state)
			})
		}
		const {pokemon} = this.props.pokemon;
		if(this.props.player==='computer' && this.state.picked.length >0 && pokemon.length===5 && this.props.isClick){

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

		return (
			<div className='pokedex'>
				{
					pokemon.map( (p,idx) => 
						<Pokecard 
							key={p.id} {...p} 
							player={this.props.player}
							isActive={idx===this.props.pick} 
							handleCompare={this.props.handleCompare}
						/>
					)
				}
			</div>
		)
	}
}

export default Pokedex;