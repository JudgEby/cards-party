import React from 'react'
import SuperButton from '../../common/SuperButton/SuperButton'
import SuperCheckbox from '../../common/SuperCheckbox/SuperCheckbox'
import SuperEditableSpan from '../../common/SuperEditableSpan/SuperEditableSpan'
import SuperInputText from '../../common/SuperInputText/SuperInputText'
import SuperRadio from '../../common/SuperRadio/SuperRadio'
import SuperRange from '../../common/SuperRange/SuperRange'
import SuperSelect from '../../common/SuperSelect/SuperSelect'

const Test = () => {
	return (
		<div>
			<div>
				<SuperButton>Ya est SuperButton</SuperButton>
			</div>
			<div>
				<SuperCheckbox>Ya est SuperCheckbox</SuperCheckbox>
			</div>
			<div>
				<SuperEditableSpan value={'value'} />
			</div>
			<div>
				<SuperInputText placeholder={'Ya est SuperInputText'} />
			</div>
			<div>
				<SuperRadio
					name={'Ya est SuperInputText'}
					options={['raz', 'dva', 'tri']}
					value={'dva'}
				/>
			</div>
			<div>
				<SuperRange value={10} />
			</div>
			<div>
				<SuperSelect
					name={'Ya est SuperInputText'}
					options={['raz', 'dva', 'tri']}
					value={'dva'}
				/>
			</div>
		</div>
	)
}

export default Test
