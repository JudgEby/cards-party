import React, {
  ChangeEvent,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from 'react'
import style from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperRadioPropsType = DefaultRadioPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
  type,
  name,
  options,
  value,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    // onChange, onChangeOption
    onChangeOption && onChangeOption(e.target.value)
    onChange && onChange(e)
  }

  const mappedOptions: any[] = options
    ? options.map((o, i) => (
        <label key={name + '-' + i} className={style.label}>
          <input
            type={'radio'}
            className={style.radio}
            checked={o === value}
            value={o}
            onChange={(e) => onChangeCallback(e)}
            name={name}
          />
          {o}
        </label>
      ))
    : []

  return <>{mappedOptions}</>
}

export default SuperRadio
