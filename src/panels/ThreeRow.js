import React from 'react'
import PropTypes from 'prop-types'

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'

import what from '../img/what.svg'
import './ThreeRow.css'

const ThreeRow = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home" />}
		>
			Три символа в ряд
		</PanelHeader>
		<img className="Persik" src={what} />
	</Panel>
)

ThreeRow.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
}

export default ThreeRow
