import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import Home from './panels/Home'
import Popularity from './panels/Popularity'
import Balancer from './panels/Balancer'
import ThreeRow from './panels/ThreeRow'

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home')
	const [fetchedUser, setUser] = useState(null)
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />)
	const [popularityBestScore, setPopularityBestScore] = useState(parseInt(localStorage.getItem('worstPasswordsTripixPopularityBestScore')) || 0)
	const [threerowBestScore, setThreerowBestScore] = useState(parseInt(localStorage.getItem('worstPasswordsTripixThreerowBestScore')) || 0)
	const [balancerBestScore, setBalancerBestScore] = useState(parseInt(localStorage.getItem('worstPasswordsTripixBalancerBestScore')) || 0)

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData()
	}, [])

	const go = e => {
		if (e?.currentTarget?.dataset?.to) {
			setActivePanel(e.currentTarget.dataset.to);
		} else {
			setActivePanel(e)
		}
	};

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home
									id='home'
									fetchedUser={fetchedUser}
									go={go}
									popularityBestScore={popularityBestScore}
									threerowBestScore={threerowBestScore}
									balancerBestScore={balancerBestScore}
								/>
								<Popularity
									id='popularity'
									go={go}
									bestScore={ popularityBestScore }
									setBestScore={ setPopularityBestScore }
								/>
								<Balancer
									id='balancer'
									go={go}
									bestScore={ threerowBestScore }
									setBestScore={ setThreerowBestScore }
								/>
								<ThreeRow
									id='threerow'
									go={go}
									bestScore={ balancerBestScore }
									setBestScore={ setBalancerBestScore }
								/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	)
}

export default App
