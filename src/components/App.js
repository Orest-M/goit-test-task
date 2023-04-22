import { useState, useEffect } from 'react';
import axios from 'axios';

import CardList from './CardList/CardList';
import LoadMore from './LoadMore/LoadMore';

import './App.css';

axios.defaults.baseURL = 'https://644392d1466f7c2b4b561856.mockapi.io/users';

function App() {
	const [data, setData] = useState(null);
	const [isAllLoaded, setisAllLoaded] = useState(false);
	const [followings, setFollowings] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get();
			setData(response.data.slice(0, 3));
		};

		fetchData().catch(console.error);

		if (window.localStorage.getItem('followings')) {
			setFollowings(JSON.parse(window.localStorage.getItem('followings')));
		}
	}, []);

	useEffect(() => {}, []);

	const onLoadMore = async () => {
		try {
			const response = await axios.get();
			setData(response.data);
			setisAllLoaded(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<CardList data={data} followings={followings} />
			{!isAllLoaded && <LoadMore onLoadMore={onLoadMore} />}
		</div>
	);
}

export default App;
