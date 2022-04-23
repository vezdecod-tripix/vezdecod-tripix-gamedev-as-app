import React from 'react'
import PropTypes from 'prop-types'

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'

import what from '../img/what.svg'
import './Balancer.css'

const Balancer = props => (
	const [modalVisible, setModelVisible] = useState(false)
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderBack onClick={props.go} data-to="home" />}
		>
			Балансер пароля
		</PanelHeader>
		<img className="Persik" src={what} />
	</Panel>
)

Balancer.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
}

export default Balancer
