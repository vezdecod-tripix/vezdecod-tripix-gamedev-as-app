import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

import './Global.css'

const Home = ({ id, go, fetchedUser,popularityBestScore, threerowBestScore, balancerBestScore }) => (
	<Panel id={id}>
		<PanelHeader>Плохие пароли Tripix</PanelHeader>
		{fetchedUser &&
		<Group header={<Header mode="secondary">Пользователь</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group header={<Header mode="secondary">Выбор игры</Header>}>
			<Div className="flex" style={{display: 'flex', flexFlow: 'column', gap: '8px'}}>
				<Div className="buttonRow">
					<Button stretched size="l" mode="secondary" onClick={go} data-to="popularity">
						Популярность паролей
					</Button>
					<Button style={{ minWidth: '128px' }} size="l" mode="secondary">
						Рекорд: { popularityBestScore }
					</Button>
				</Div>
				<Div className="buttonRow">
					<Button stretched size="l" mode="secondary" onClick={go} data-to="threerow">
						Три символа в ряд
					</Button>
					<Button style={{ minWidth: '128px' }} size="l" mode="secondary">
						Рекорд: { threerowBestScore }
					</Button>
				</Div>
				<Div className="buttonRow">
					<Button stretched size="l" mode="secondary" onClick={go} data-to="balancer">
						Балансер пароля
					</Button>
					<Button style={{ minWidth: '128px' }} size="l" mode="secondary">
						Рекорд: { balancerBestScore }
					</Button>
				</Div>
			</Div>
		</Group>
	</Panel>
)

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
	popularityBestScore: PropTypes.number,
	threerowBestScore: PropTypes.number,
	balancerBestScore: PropTypes.number
}

export default Home
