import React, { useEffect, useState } from 'react'
import s from './Packs.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	addNewPack,
	CardsPackType,
	deletePack,
	getPacksTC,
	updatePackName,
} from '../../n1-main/m2-bll/packs-reducer'
import { AppRootStateType } from '../../n1-main/m2-bll/store'
import { Redirect } from 'react-router-dom'
import SuperInputText from '../../n1-main/m1-ui/common/SuperInputText/SuperInputText'
import SuperButton from '../../n1-main/m1-ui/common/SuperButton/SuperButton'
import PacksListItem from './PacksListItem/PacksListItem'
import PacksPaginator from './PacksPaginator/PacksPaginator'

export const Packs = () => {
	const dispatch = useDispatch()
	const [addNewPackNameInputValue, setAddNewPackNameInputValue] = useState('')
	const [showOnlyMyPack, setShowOnlyMyPack] = useState(false)

	useEffect(() => {
		dispatch(getPacksTC())
	}, [])

	const CardsPacks = useSelector<AppRootStateType, Array<CardsPackType>>(
		state => state.packs.packs
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
		if (showOnlyMyPack) {
			dispatch(addNewPack(addNewPackNameInputValue, false, '', userID))
		} else {
			dispatch(addNewPack(addNewPackNameInputValue, false, ''))
		}
	}

	const deletePackHandler = (packId: string) => {
		dispatch(deletePack(packId))
	}

	const getMyPacksHandler = () => {
		dispatch(getPacksTC(userID))
		setShowOnlyMyPack(true)
	}

	const getAllPacksHandler = () => {
		dispatch(getPacksTC())
		setShowOnlyMyPack(false)
	}

	const onUpdatePackNameHandler = (packId: string, packName: string) => {
		dispatch(updatePackName(packId, packName))
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
						<PacksListItem
							key={pack._id}
							pack={pack}
							userID={userID}
							onUpdatePackNameHandler={onUpdatePackNameHandler}
							deletePackHandler={deletePackHandler}
						/>
					))}
				</div>
				<div>
					<PacksPaginator userId={showOnlyMyPack ? userID : null} />
				</div>
			</div>
		</div>
	)
}
