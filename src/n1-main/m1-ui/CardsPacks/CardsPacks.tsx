import React, { useEffect } from 'react'
import s from './CardsPacks.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPacksTC } from '../../m2-bll/cardsPacks-reducer'
import { AppRootStateType } from '../../m2-bll/store'
import { NavLink, Redirect } from 'react-router-dom'

export const CardsPacks = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPacksTC({pageCount:100}))
	},[])

	const CardsPacks = useSelector<AppRootStateType,any>(state => state.CardsPacks.cardsPacks)
	const userID = useSelector<AppRootStateType,string|null>(state => state.profile._id)
	const isAuthorized = useSelector<AppRootStateType,boolean>(state => state.auth.isAuthorized)

   if(!isAuthorized){
		return(<Redirect to={'/login'}/>)
	}
	return (
		<div className={s.CardsPacksContainer}>
			<div className={s.CardsPacks}>
				<div className={s.PacksParams}>
					<div style={{width:'20%',fontSize:30}}>Name</div>
					<div style={{width:'20%',fontSize:30}}>CardsCount</div>
					<div style={{width:'20%',fontSize:30}}>Updated</div>
					<div style={{width:'20%',fontSize:30}}>Url</div>
					<div style={{width:'20%',fontSize:30}}>
						<button className={s.addContainer}>add</button>
					</div>
				</div>
				<div className={s.PacksContainer}>
				{CardsPacks.map((Pack:any) => {
					return (
						<div className={s.Pack}>
							<div style={{width:'20%',fontSize:30}}>{Pack.name}</div>
							<div style={{width:'20%',fontSize:30}}>{Pack.cardsCount}</div>
							<div style={{width:'20%',fontSize:30}}>{Pack.updated}</div>
							<div style={{width:'20%',fontSize:30}}></div>
							{userID && userID === Pack.user_id
								?<div style={{width:'20%',fontSize:30}}>
									<button>Delete</button>
									<button>Update</button>
									<NavLink to={`/cards/${Pack._id}`}>Cards</NavLink>
								</div>
								:<div style={{width:'20%',fontSize:30}}>
									<NavLink to={`/cards/${Pack._id}`}>Cards</NavLink>
								</div>}


						</div>
					)
				})}
				</div>
			</div>
		</div>

	)
}