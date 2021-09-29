import React, { ReactElement } from 'react'
import styles from './SuperPaginator.module.css'

type UsersType = {
	pageSize: number
	totalItemsCount: number
	currentPage: number
	onPageClick: (page: number) => void
}

const SuperPaginator = React.memo((props: UsersType) => {
	const { pageSize, totalItemsCount, currentPage, onPageClick } = props

	const leftPortionPageNumber = 5
	const rightPortionPageNumber = 5
	const correctRightPortionPageNumber =
		currentPage <= leftPortionPageNumber
			? rightPortionPageNumber + (leftPortionPageNumber - currentPage) + 1
			: rightPortionPageNumber

	const pagesArray: Array<ReactElement<any, any>> = []
	const pagesCount = Math.ceil(totalItemsCount / pageSize)
	for (let i = 1; i <= pagesCount; i++) {
		if (i - currentPage < -leftPortionPageNumber) {
			continue
		}
		if (i - currentPage > correctRightPortionPageNumber) {
			break
		}
		pagesArray.push(
			<span
				key={i}
				className={`${styles.pageNumber} ${
					currentPage === i && styles.selectedPage
				}`}
				onClick={() => onPageClick(i)}
			>
				{i}
			</span>
		)
	}

	return (
		<div>
			<div>{pagesArray}</div>
		</div>
	)
})

export default SuperPaginator
