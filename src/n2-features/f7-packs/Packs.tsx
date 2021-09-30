import React, { useEffect, useState } from 'react'
import s from './Packs.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	addNewPack,
	CardsPackType,
	changeGetPackParams,
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
import { Search } from '../../n1-main/m1-ui/common/Search/Search'
import { Slider } from './Slider/Slider'

export const Packs = () => {
	const dispatch = useDispatch()
	const [addNewPackNameInputValue, setAddNewPackNameInputValue] = useState('')
	const [showOnlyMyPack, setShowOnlyMyPack] = useState(false)
	const packName = useSelector<AppRootStateType, string>(
		state => state.packs.packName
	)
	const sortPacks = useSelector<AppRootStateType, string>(
		state => state.packs.sortPacks
	)

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
		if (isAuthorized) {
			//определяем, передавать ли ID пользователя в зависимости от того, показывать ли все паки или только пользователя
			const userIDForGettingPacks = showOnlyMyPack ? userID : null
			dispatch(getPacksTC(userIDForGettingPacks))
		}
	}, [packName, sortPacks])

	useEffect(() => {
		if (isAuthorized) {
			setAddNewPackNameInputValue('')
		}
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

	const searchPacksByName = (value: string) => {
		dispatch(changeGetPackParams({ packName: value }))
	}

	const sortColumn = (name: string) => {
		if (sortPacks === `0${name}`) {
			dispatch(changeGetPackParams({ sortPacks: `1${name}` }))
		} else {
			dispatch(changeGetPackParams({ sortPacks: `0${name}` }))
		}
	}

	const sortedSign = (name: string) => {
		if (sortPacks.slice(1) !== name) {
			return `\u21C5`
		} else if (sortPacks.slice(0, 1) === '0') {
			return `\u25BC`
		} else {
			return '\u25B2'
		}
	}

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}

	return (
		<div className={s.CardsPacksContainer}>
			<Slider min={0} max={100} onChange={value => console.log(value)} />
			<Search handler={searchPacksByName} placeholder={'Search...'} />
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
					<div
						className={`${s.nameColumn} ${s.tableHeader}`}
						onClick={() => {
							sortColumn('name')
						}}
					>
						Name
						<span>{sortedSign('name')}</span>
					</div>
					<div
						className={`${s.cardsCountColumn} ${s.tableHeader}`}
						onClick={() => {
							sortColumn('cardsCount')
						}}
					>
						CardsCount
						<span>{sortedSign('cardsCount')}</span>
					</div>
					<div
						className={`${s.updatedColumn} ${s.tableHeader}`}
						onClick={() => {
							sortColumn('updated')
						}}
					>
						Updated
						<span>{sortedSign('updated')}</span>
					</div>
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
