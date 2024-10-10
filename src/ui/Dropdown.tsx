import { Dispatch, SetStateAction, useState } from 'react';
import { CrossIcon, LabelIcon, ShevronIcon } from '../icons';
import { STATUSES } from '../constants';
import { Filters, Status } from '../types';

const initialValue = {
  id: '',
  label: 'Status'
};

interface DropdownProps {
  setFilters: Dispatch<SetStateAction<Filters>>,
}

const Dropdown = ({ setFilters }: DropdownProps) => {
  const [value, setValue] = useState(initialValue.label);
  const [isDropdown, setDropdown] = useState(false);

  const switchDropdown = () => {
    setDropdown(prev => !prev);
  }

  const handleOptionClick = (option: Status) => {
    setFilters((prev: Filters) => ({ ...prev, status: option.id }));
    setValue(option.label);
    setDropdown(false);
  }

  const resetValue = () => {
    setValue(initialValue.label);
    setFilters((prev: Filters) => ({ ...prev, status: 0 }));
  }
  return (
    <div className='relative'>
      <div className='absolute flex_center top-2 left-3'>
        <LabelIcon />
      </div>
      <div
        className={`
          ${value === initialValue.label && 'text-black-400'}
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
        onClick={value === initialValue.label ? switchDropdown : resetValue}
      >
        {value === initialValue.label ? <ShevronIcon /> : <CrossIcon />}
      </button>
      {isDropdown && <div className='absolute top-full left-0 right-0 pt-1'>
        <ul className='p-2 bg-white border border-black shadow-sm rounded-lg'>
          {STATUSES.map(({ id, label }) => (
            <li
              key={`status_${id}`}
              onClick={() => handleOptionClick({ id, label })}
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