import css from './LoadMore.module.css';

const LoadMore = ({ onLoadMore }) => {
	return (
		<button className={css.btn} onClick={onLoadMore}>
			Load More
		</button>
	);
};

export default LoadMore;
