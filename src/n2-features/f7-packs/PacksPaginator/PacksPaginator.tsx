import React from 'react'
import SuperPaginator from '../../../n1-main/m1-ui/common/SuperPaginator/SuperPaginator'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../../n1-main/m2-bll/store'
import { changeGetPackParams } from '../../../n1-main/m2-bll/packs-reducer'

type PacksPaginatorProps = {
	userId: string | null
}

const PacksPaginator = (props: PacksPaginatorProps) => {
	const dispatch = useDispatch()
	const pageCount = useSelector<AppRootStateType, number>(
		state => state.packs.pageCount
	)
	const cardPacksTotalCount = useSelector<AppRootStateType, number>(
		state => state.packs.cardPacksTotalCount
	)
	const currentPage = useSelector<AppRootStateType, number>(
		state => state.packs.page
	)

	const onPageClick = (page: number) => {
		dispatch(changeGetPackParams({ page }))
	}

	return (
		<SuperPaginator
			pageSize={pageCount}
			totalItemsCount={cardPacksTotalCount}
			currentPage={currentPage}
			onPageClick={onPageClick}
		/>
	)
}

export default PacksPaginator
