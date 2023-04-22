import { useState, useEffect } from 'react';

import css from './Card.module.css';
import logo from '../../logo-goit.svg';

const Card = ({
	item: { tweets, followers, id, avatar, user },
	item,
	followings,
}) => {
	const [isFollowed, setIsFollowed] = useState(false);
	const [userFollowers, setUserFollowers] = useState(followers);

	useEffect(() => {
		if (followings?.some((item) => item.id === id)) {
			setIsFollowed(true);
			setUserFollowers(item.followers + 1);
		}
	}, [followings, id, item.followers]);

	const changedFollowers = changeFollowersFormat();

	function changeFollowersFormat() {
		if (userFollowers.toString().length === 4) {
			return `${userFollowers.toString().slice(0, 1)},${userFollowers
				.toString()
				.slice(3)}`;
		}
		if (userFollowers.toString().length === 5) {
			return `${userFollowers.toString().slice(0, 2)},${userFollowers
				.toString()
				.slice(3)}`;
		}
		if (userFollowers.toString().length === 6) {
			return `${userFollowers.toString().slice(0, 3)},${userFollowers
				.toString()
				.slice(3)}`;
		}
		return userFollowers;
	}

	const onClickFollowBtn = () => {
		changeIsFollowed();
		changeFollowers();
	};

	const changeIsFollowed = () => {
		setIsFollowed(!isFollowed);
	};

	const changeFollowers = () => {
		if (isFollowed) {
			setUserFollowers(userFollowers - 1);

			const newArr = JSON.parse(
				window.localStorage.getItem('followings')
			).filter((user) => user.id !== id);
			window.localStorage.setItem('followings', JSON.stringify(newArr));
		} else {
			setUserFollowers(userFollowers + 1);

			if (window.localStorage.getItem('followings')) {
				window.localStorage.setItem(
					'followings',
					JSON.stringify([
						...JSON.parse(window.localStorage.getItem('followings')),
						item,
					])
				);
			} else {
				window.localStorage.setItem('followings', JSON.stringify([item]));
			}
		}
	};

	return (
		<div className={css.card}>
			<div className={css['card-top']}>
				<img src={logo} alt="goit" className={css['card-logo']} />
			</div>

			<div className={css['card-line']}></div>

			<div>
				<div className={css['card-avatar-div']}>
					<img src={avatar} alt="avatar" className={css['card-avatar']} />
				</div>
				<p className={css['card-tweets']}>{tweets} tweets</p>
				<p className={css['card-followers']}>
					{userFollowers.toString().length > 3
						? changedFollowers
						: userFollowers}{' '}
					followers
				</p>
				{isFollowed ? (
					<button className={css['card-btn-active']} onClick={onClickFollowBtn}>
						Following
					</button>
				) : (
					<button className={css['card-btn']} onClick={onClickFollowBtn}>
						follow
					</button>
				)}
			</div>
		</div>
	);
};

export default Card;
