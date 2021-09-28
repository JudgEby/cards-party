import React, { useEffect, useState } from 'react'
import s from './CardsPacks.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	addNewPack,
	CardsPackType,
	deletePack,
	getPacksTC,
	updatePackName,
} from '../../m2-bll/сardPacks-reducer'
import { AppRootStateType } from '../../m2-bll/store'
import { NavLink, Redirect } from 'react-router-dom'
import SuperInputText from '../common/SuperInputText/SuperInputText'
import SuperButton from '../common/SuperButton/SuperButton'
import CardsPacksListItem from './CardsPacksListItem/CardsPacksListItem'

export const CardsPacks = () => {
	const dispatch = useDispatch()
	const [addNewPackNameInputValue, setAddNewPackNameInputValue] = useState('')
	const [showOnlyMyPack, setShowOnlyMyPack] = useState(false)

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

	const CardsPacks = useSelector<AppRootStateType, Array<CardsPackType>>(
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

	const onUpdatePackNameHandler = (packId: string, packName: string) => {
		dispatch(updatePackName(packId, packName, { pageCount: 100 }))
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
					{CardsPacks.map((pack: any) => (
						<CardsPacksListItem
							key={pack._id}
							pack={pack}
							userID={userID}
							onUpdatePackNameHandler={onUpdatePackNameHandler}
							deletePackHandler={deletePackHandler}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
