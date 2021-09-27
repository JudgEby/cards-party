import React, { useEffect, useState } from 'react'
import s from './CardsPacks.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	addNewPack,
	deletePack,
	getPacksTC,
} from '../../m2-bll/сardPacks-reducer'
import { AppRootStateType } from '../../m2-bll/store'
import { NavLink, Redirect } from 'react-router-dom'
import SuperInputText from '../common/SuperInputText/SuperInputText'
import SuperButton from '../common/SuperButton/SuperButton'

export const CardsPacks = () => {
	const dispatch = useDispatch()
	const [addNewPackNameInputValue, setAddNewPackNameInputValue] = useState('')
	const [showOnlyMyPack, setShowOnlyMyPack] = useState(false)
	const [updateMyPackNameMode, setUpdateMyPackNameMode] = useState(true)
	const [updateMyPackNameInputValue, setUpdateMyPackNameInputValue] =
		useState('')

	const getPacksWithParams = (params: {
		user_id?: string | null
		pageCount?: number
		min?: number
		max?: number
		page?: number
	}) => {
		dispatch(getPacksTC({ ...params }))
	}

	useEffect(() => {
		getPacksWithParams({ pageCount: 100 })
	}, [])

	const CardsPacks = useSelector<AppRootStateType, any>(
		state => state.cardsPacks.cardsPacks
	)
	const userID = useSelector<AppRootStateType, string | null>(
		state => state.profile._id
	)
	const isAuthorized = useSelector<AppRootStateType, boolean>(
		state => state.auth.isAuthorized
	)

	useEffect(() => {
		setAddNewPackNameInputValue('')
	}, [CardsPacks])

	const addNewPackHandler = () => {
		dispatch(
			addNewPack(addNewPackNameInputValue, false, '', { pageCount: 100 })
		)
	}

	const deletePackHandler = (packId: string) => {
		dispatch(deletePack(packId, { pageCount: 100 }))
	}

	const getMyPacksHandler = () => {
		getPacksWithParams({ pageCount: 100, user_id: userID })
		setShowOnlyMyPack(true)
	}

	const getAllPacksHandler = () => {
		getPacksWithParams({ pageCount: 100 })
		setShowOnlyMyPack(false)
	}

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}
	return (
		<div className={s.CardsPacksContainer}>
			<div className={s.CardsPacks}>
				<div className={s.addingNewPackBlock}>
					{!showOnlyMyPack ? (
						<SuperButton onClick={getMyPacksHandler}>
							Show My Packs
						</SuperButton>
					) : (
						<SuperButton onClick={getAllPacksHandler}>
							Show All Packs
						</SuperButton>
					)}
					<SuperInputText
						placeholder={'enter new pack name'}
						onChangeText={setAddNewPackNameInputValue}
						value={addNewPackNameInputValue}
					/>
					<SuperButton onClick={addNewPackHandler}>
						Add New Pack
					</SuperButton>
				</div>
				<div className={s.PacksParams}>
					<div className={s.nameColumn}>Name</div>
					<div className={s.cardsCountColumn}>CardsCount</div>
					<div className={s.updatedColumn}>Updated</div>
					<div className={s.urlColumn}>Url</div>
					<div className={s.cardsColumn}>Cards</div>
				</div>
				<div className={s.PacksContainer}>
					{CardsPacks.map((Pack: any) => {
						return (
							<div className={s.Pack}>
								<div className={s.nameColumn}>{Pack.name}</div>
								<div className={s.cardsCountColumn}>
									{Pack.cardsCount}
								</div>
								<div className={s.updatedColumn}>
									{new Date(Pack.updated).toLocaleString('ru-RU')}
								</div>
								<div className={s.urlColumn}>some url</div>
								<div className={s.actionsWithPackBlock}>
									{userID && userID === Pack.user_id && (
										<>
											{updateMyPackNameMode ? (
												<>
													<SuperInputText />
													<SuperButton>Send New Name</SuperButton>
													<SuperButton canceling>
														Cancel
													</SuperButton>
												</>
											) : (
												<>
													<SuperButton
														onClick={() => {
															deletePackHandler(Pack._id)
														}}
													>
														Delete
													</SuperButton>
													<SuperButton>Update Name</SuperButton>
												</>
											)}
										</>
									)}
									<NavLink to={`/cards/${Pack._id}`}>Cards</NavLink>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
