import { Dispatch, SetStateAction } from 'react';
import { DateInput, Dropdown } from '../ui';

interface FiltersProps {
  label: any,
  setFilters: Dispatch<SetStateAction<any>>,
}

const Filters = ({ filters, setFilters }: FiltersProps) => {
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

export default Filters;