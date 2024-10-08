interface AlertProps {
  message: string,
  handleClose: () => void,
}

const Alert = ({ message = '', handleClose }: AlertProps) => {
  return (
    <div className='fixed inset-0 bg-slate-500/50 flex_center'>
      <div className='flex flex-col items-center p-8 rounded-2xl bg-white gap-6'>
        <p className='text-lg font-medium'>
          {message}
        </p>
        <button className='button rose h-10 w-40' onClick={handleClose}>
          OK
        </button>
      </div>
    </div>
  )
}

export default Alert;