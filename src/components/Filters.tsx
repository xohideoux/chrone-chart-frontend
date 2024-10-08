import { DateInput, Dropdown } from '../ui';

const Filters = () => {
  return (
    <section className='w-full flex items-center flex-wrap gap-8 rounded-xl'>
      <div className='flex_between flex-wrap gap-4'>
        <DateInput />
        <DateInput />
      </div>
      <Dropdown />
    </section>
  )
}

export default Filters;