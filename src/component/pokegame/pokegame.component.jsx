import React from 'react';

import './pokegame.styles.css';

class Pokegame extends React.Component {
	
	handleWinner = (player)=>{
		console.log('this.state')
	}
	render () {
		// console.log(this.props)
		const {humanWon,computerWon}=this.props;
		if(humanWon+computerWon===5){
			const winner = humanWon>computerWon?'Congratulations,You win the game.':'You lose it!';
			setTimeout(()=>{
				alert(winner)
				const reset=true;
				this.props.fetchData(reset)
			},1000)
		}
		return (
			<div className='pokegame'>
				<div className='human'>
					<h1>YOU Won: {this.props.humanWon}</h1>
					<hr />
				</div>
				<div className='computer'>
					<h1>COMPUTER Won: {this.props.computerWon}</h1>
					<hr />
				</div>
			</div>
		)
	}
}

export default Pokegame;