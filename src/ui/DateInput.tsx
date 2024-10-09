
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/debounce';
import { DateIcon } from '../icons';
import { formatDateInputValue, formatDateToReq } from '../utils';
import { Filters } from '../types';

interface DateInputProps {
  label: string,
  setFilters: Dispatch<SetStateAction<Filters>>,
}

const DateInput = ({ label, setFilters }: DateInputProps) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 300);

  const handleDateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(formatDateInputValue(evt.target.value));
  };

  useEffect(() => {
    setFilters((prev: Filters) => ({ ...prev, [label]: formatDateToReq(debouncedValue) }));
  }, [debouncedValue, label, setFilters]);

  return (
    <div className='relative'>
      <div className='absolute flex_center top-2 left-3'>
        <DateIcon />
      </div>
      <input
        type='text'
        className='filter_input'
        onChange={handleDateChange}
        placeholder='dd.mm.yyyy'
        value={value}
      />
    </div>
  )
}

export default DateInput;