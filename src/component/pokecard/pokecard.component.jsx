import React from 'react';
import './pokecard.styles.css';

const POKI_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'

class Pokecard extends React.Component {
	state={
		isActive: false
	}
	componentDidMount(){
		// if(this.props.isActive){
		// 	this.setState({isActive: true})
		// }		
	}
	handleClick = ()=> {
		if(this.props.player==='human' && !this.state.isActive){
			this.setState({isActive: !this.state.isActive})
			setTimeout(()=>{
				this.props.handleCompare(this.props.base_experience)
			},1000)
		}
	}
	render() {
		// console.log(this.props)
		if(this.props.isActive && !this.state.isActive){
			setTimeout(()=>{
				this.setState({isActive: true})
			},10)
		}
		const id = `00${this.props.id}`.slice(-3);
		const imgSrc = `${POKI_API}${id}.png`;
		return (
			<div className="poke-card"
				onClick={this.handleClick}
			>
			  <div className="poke-card-inner">
			    <div className={this.state.isActive? 'hidden' :"poke-card-front"}>
			      <img className='pokeball-img' src="https://i.pinimg.com/originals/c9/29/2e/c9292ec4cc6b156dfe21cfe6825ce8b5.jpg" alt="pokeball" />
			    </div>
			    <div className={this.state.isActive?"poke-card-back":'hidden'}>
			      <h2 className='pokemon-name'>{this.props.name}</h2>
				  <img className='pokemon-img' src={imgSrc} alt={this.props.name} />
				  <hr />
				  <h3 className='pokemon-data'>Type: {this.props.type}</h3>
				  <h3 className='pokemon-data'>Exp: {this.props.base_experience}</h3>
			    </div>
			  </div>
			</div>
			
		)
	}
} 

export default Pokecard;