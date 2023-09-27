import css from "./Button.module.css"

export const LoadMoreButton = ({ HandleLoadMoreClick }) => {
    return (
        <button type='button' onClick={HandleLoadMoreClick} className={css.Button}>Load more</button>
    )
}