import Card from '../Card/Card';

import css from './CardList.module.css';

const CardList = ({ data, followings }) => {
	return (
		<ul className={css.list}>
			{data &&
				data.map((item) => (
					<li key={item.id}>
						<Card item={item} followings={followings} />
					</li>
				))}
		</ul>
	);
};

export default CardList;
