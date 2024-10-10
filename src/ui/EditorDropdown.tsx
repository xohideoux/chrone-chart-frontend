/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CrossIcon, ShevronIcon } from '../icons';
import { Status, TaskForm, User } from '../types';
import { fetchUsers } from '../http/userApi';
import { fetchStatuses } from '../http/taskApi';
import { getNameFromEmail } from '../utils';

interface EditorDropdownProps {
  type: string,
  form: TaskForm
  setForm: Dispatch<SetStateAction<TaskForm>>,
}

const EditorDropdown = ({ type, form, setForm }: EditorDropdownProps) => {
  const [options, setOptions] = useState([])
  const [value, setValue] = useState(form[type]);
  const [isDropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (options.length !== 0) return;

    if (type === 'assignee') {
      fetchUsers()
        .then((resp) => {
          let users = [];

          resp.data.forEach((item) => {
            const user = {
              id: item.id,
              label: getNameFromEmail(item.email)
            };
            users.push(user);
          });

          setOptions(users);
        });
    } else {
      fetchStatuses()
        .then((resp) => {
          setOptions(resp);
        })
    }
  }, [])

  const switchDropdown = () => {
    setDropdown(prev => !prev);
  }

  const handleOptionClick = (option: Status) => {
    setForm((prev: TaskForm) => ({ ...prev, [type]: option.id }));
    setValue(option.label);
    setDropdown(false);
  }

  const resetValue = () => {
    setValue(undefined);
    setForm((prev: TaskForm) => ({ ...prev, [type]: undefined }));
  }

  return (
    <div className='relative'>
      <div
        className={`
          ${value === undefined && 'text-black-400'}
          editor_dropdown
        `}
      >
        {value === undefined ? type : value}
      </div>
      <button
        type='button'
        className={
          `${isDropdown && '-rotate-180'}
          transition-transform absolute flex_center top-3.5 right-4`
        }
        onClick={value === undefined ? switchDropdown : resetValue}
      >
        {value === undefined ? <ShevronIcon /> : <CrossIcon />}
      </button>
      {isDropdown && <div className='absolute top-full left-0 right-0 pt-1 z-50'>
        <ul className='p-2 bg-white border border-black shadow-sm rounded-lg'>
          {options.map(({ id, label }) => (
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

export default EditorDropdown;