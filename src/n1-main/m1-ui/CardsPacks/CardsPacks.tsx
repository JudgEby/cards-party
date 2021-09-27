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

	useEffect(() => {
		dispatch(getPacksTC({ pageCount: 100 }))
	}, [])

	const addNewPackHandler = () => {
		dispatch(
			addNewPack(addNewPackNameInputValue, false, '', { pageCount: 100 })
		)
	}

	const deletePackHandler = (packId: string) => {
		dispatch(deletePack(packId, { pageCount: 100 }))
	}

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

	if (!isAuthorized) {
		return <Redirect to={'/login'} />
	}
	return (
		<div className={s.CardsPacksContainer}>
			<div className={s.CardsPacks}>
				<div className={s.addingNewPackBlock}>
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
					<div style={{ width: '20%', fontSize: 30 }}>Name</div>
					<div style={{ width: '20%', fontSize: 30 }}>CardsCount</div>
					<div style={{ width: '20%', fontSize: 30 }}>Updated</div>
					<div style={{ width: '20%', fontSize: 30 }}>Url</div>
					<div style={{ width: '20%', fontSize: 30 }}></div>
				</div>
				<div className={s.PacksContainer}>
					{CardsPacks.map((Pack: any) => {
						return (
							<div className={s.Pack}>
								<div style={{ width: '20%', fontSize: 30 }}>
									{Pack.name}
								</div>
								<div style={{ width: '20%', fontSize: 30 }}>
									{Pack.cardsCount}
								</div>
								<div style={{ width: '20%', fontSize: 30 }}>
									{new Date(Pack.updated).toLocaleString('ru-RU')}
								</div>
								<div style={{ width: '20%', fontSize: 30 }}></div>
								{userID && userID === Pack.user_id ? (
									<div style={{ width: '20%', fontSize: 30 }}>
										<SuperButton
											onClick={() => {
												deletePackHandler(Pack._id)
											}}
										>
											Delete
										</SuperButton>
										<SuperButton>Update</SuperButton>
										<NavLink to={`/cards/${Pack._id}`}>Cards</NavLink>
									</div>
								) : (
									<div style={{ width: '20%', fontSize: 30 }}>
										<NavLink to={`/cards/${Pack._id}`}>Cards</NavLink>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
