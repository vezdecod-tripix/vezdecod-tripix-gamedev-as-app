import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Div, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'

import think from '../img/think.svg'
import wait from '../img/wait.svg'
import cool from '../img/cool.svg'
import rage from '../img/rage.svg'
import './Popularity.css'
import './Global.css'
import data_passwords from '../data/passwords.js'

const shuffle = (array) => {
	let currentIndex = array.length, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}
let passwords = shuffle(Object.entries(data_passwords))

const Popularity = props => {
	const [score, setScore] = useState(0)
	const [pointer, setPointer] = useState(1)
	const [currentPassword, setCurrentPassword] = useState(passwords[pointer][0])
	const [currentPasswordUses, setCurrentPasswordUses] = useState(passwords[pointer][1])
	const [nextPassword, setNextPassword] = useState(passwords[pointer + 1][0])
	const [nextPasswordUses, setNextPasswordUses] = useState(passwords[pointer + 1][1])
	const [nextMask, setNextMask] = useState('???')
	const [image, setImage] = useState(think)
	const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
	let alive = true

	const lose = () => {
		if (props.bestScore < score) {
			localStorage.setItem('worstPasswordsTripixPopularityBestScore', score)
			props.setBestScore(score)
		}
		props.go('home')
		passwords = shuffle(passwords)
	}

	const point = () => {
		setScore(score + 1)
		setCurrentPassword(passwords[pointer + 1][0])
		setCurrentPasswordUses(passwords[pointer + 1][1])
		setNextPassword(passwords[pointer + 2][0])
		setNextPasswordUses(passwords[pointer + 2][1])
		setNextMask('???')
		setImage(think)
		setBackgroundColor( '#FFFFFF')
	}

	const counter = (to, count = 0) => {
		if (count < to) {
			count += Math.max((to - count) / 8, 1)
			setNextMask(Math.floor(count))
			requestAnimationFrame(() => counter(to, count))
		} else {
			setPointer(pointer < 195 ? pointer + 1 : 1)
			setNextMask(nextPasswordUses)
			setImage(alive ? cool : rage)
			setBackgroundColor( alive ? '#D7FFE2' : '#FD7575')
			setTimeout(() => {
				alive ? point() : lose()
			}, 1000)
		}
	}


	const selectCurrent = () => {
		setBackgroundColor( '#EEEEEE')
		setImage(wait)
		console.log('current', currentPassword)
		if (currentPasswordUses < nextPasswordUses) {
			alive = false
		}
		counter(nextPasswordUses)
	}

	const selectNext = () => {
		setBackgroundColor( '#EEEEEE')
		setImage(wait)
		console.log('next', nextPassword)
		if (currentPasswordUses > nextPasswordUses) {
			alive = false
		}
		counter(nextPasswordUses)
	}

	return (
	<Panel id={props.id}>
		<PanelHeader
			className="Header"
			left={<PanelHeaderBack onClick={props.go} data-to="home" />}
		>
			Популярность паролей
		</PanelHeader>
		<Div className="FlexCenter PopularityBackground" style={{ backgroundColor: backgroundColor }}>
			<span>
				Счёт: { score }
			</span>
			<p>
				Выберите пароль, который по-вашему более популярный
			</p>
			<img
				className="Thinker"
				src={image}
				alt="thinker"
			/>
			<Div className="ChooseButtons">
				<Div className="Password CurrentPassword">
					<Button
						className="PasswordButton"
						onClick={selectCurrent}>
						{ currentPassword }
					</Button>
					{ currentPasswordUses } использований
				</Div>
				<span className="ButtonsSeparator" />
				<Div className="Password NextPassword">
					<Button
						className="PasswordButton"
						onClick={selectNext}>
						{ nextPassword }
					</Button>
					{ nextMask } использований
				</Div>
			</Div>
		</Div>
	</Panel>
	)
}

Popularity.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	bestScore: PropTypes.number,
	setBestScore: PropTypes.func
}

export default Popularity
