
import { ChangeEvent, Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/debounce';
import { DateIcon } from '../icons';
import { formatDateInputValue } from '../utils';

interface DateInputProps {
  label: string,
  setFilters: Dispatch<SetStateAction<any>>,
}

const DateInput = ({ label, setFilters }: DateInputProps) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 300);

  const handleDateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(formatDateInputValue(evt.target.value));
  };

  useEffect(() => {
    setFilters((prev: any) => ({ ...prev, [label]: debouncedValue }));
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