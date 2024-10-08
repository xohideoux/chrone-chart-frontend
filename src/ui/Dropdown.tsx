import { Dispatch, SetStateAction, useState } from 'react';
import { CrossIcon, LabelIcon, ShevronIcon } from '../icons';
import { STATUSES } from '../constants';
import { Filters, Status } from '../types';

const initialValue = 'Status';

interface DropdownProps {
  setFilters: Dispatch<SetStateAction<Filters>>,
}

const Dropdown = ({ setFilters }: DropdownProps) => {
  const [value, setValue] = useState(initialValue);
  const [isDropdown, setDropdown] = useState(false);

  const switchDropdown = () => {
    setDropdown(prev => !prev);
  }

  const handleOptionClick = (option: Status) => {
    setFilters((prev: Filters) => ({ ...prev, status: option.label }));
    setValue(option.label);
    setDropdown(false);
  }

  const resetValue = () => {
    setValue(initialValue);
    setFilters((prev: Filters) => ({ ...prev, status: '' }));
  }
  return (
    <div className='relative'>
      <div className='absolute flex_center top-2 left-3'>
        <LabelIcon />
      </div>
      <div
        className={`
          ${value === initialValue && 'text-black-400'}
          filter_input dropdown
        `}
      >
        {value}
      </div>
      <button
        className={
          `${isDropdown && '-rotate-180'}
          transition-transform absolute flex_center top-2.5 right-3`
        }
        onClick={value === initialValue ? switchDropdown : resetValue}
      >
        {value === initialValue ? <ShevronIcon /> : <CrossIcon />}
      </button>
      {isDropdown && <div className='absolute top-full left-0 right-0 pt-1'>
        <ul className='p-2 bg-white border border-black shadow-sm rounded-lg'>
          {STATUSES.map(({ key, label }) => (
            <li
              key={`status_${key}`}
              onClick={() => handleOptionClick({ key, label })}
              className='text-black-400 hover:text-accent cursor-pointer'
            >
              {label}
            </li>
          ))}
        </ul>
      </div>}
    </div>
  )
}

export default Dropdown;