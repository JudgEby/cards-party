import React from 'react'
import s from './Modal.module.css'


const Modal = (props:any) => {
	return(
		<div className={s.Container}>
			<div onClick={props.OnBackClick} className={s.background}>

			</div>
			<div className={s.main}>
				{props.children}
			</div>
		</div>
	)
}

export default Modal