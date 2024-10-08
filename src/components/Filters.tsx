import { Dispatch, SetStateAction } from 'react';
import { DateInput, Dropdown } from '../ui';
import { Filters } from '../types';

interface FiltersProps {
  setFilters: Dispatch<SetStateAction<Filters>>,
}

const FiltersSection = ({ setFilters }: FiltersProps) => {
  return (
    <section className='w-full flex items-center flex-wrap gap-8 rounded-xl'>
      <div className='flex_between flex-wrap gap-4'>
        <DateInput label='date-from' setFilters={setFilters} />
        <DateInput label='date-to' setFilters={setFilters} />
      </div>
      <Dropdown setFilters={setFilters} />
    </section>
  )
}

export default FiltersSection;