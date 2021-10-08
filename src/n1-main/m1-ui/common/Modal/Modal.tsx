import React from 'react'
import s from './Modal.module.css'

type PropsType = {
	OnBackClick: () => void
	children: React.ReactNode
}

const Modal = (props: PropsType) => {
	return (
		<div className={s.Container}>
			<div onClick={props.OnBackClick} className={s.background} />
			<div className={s.main}>{props.children}</div>
		</div>
	)
}

export default Modal
