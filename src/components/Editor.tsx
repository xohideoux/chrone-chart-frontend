import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { Task } from '../types';
import { EditorDropdown } from '../ui';
import { formatDateInputValue, formatDateToString, getNameFromEmail } from '../utils';
import { createTask, editTask } from '../http/taskApi';

interface EditorProps {
  task?: Task,
  handleClose: () => void,
}

const formatToISO8601 = (dateString: string) => {
  const [day, month, year] = dateString.split('.').map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || month < 1 || month > 12) {
    throw new Error('Invalid date format');
  }

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error('Invalid date');
  }

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00Z`;
};


const Editor = ({ task, handleClose }: EditorProps) => {
  console.log(task);
  const [form, setForm] = useState({
    title: task?.title || '',
    deadline: task ? formatDateToString(task?.deadline) : undefined,
    description: task?.description || '',
    status: task?.taskStatus.label,
    assignee: task ? getNameFromEmail(task?.assigneeUser.email) : undefined,
  });

  useEffect(() => {
    console.log(form);
  }, [form])

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;

    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;

    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleDeadlineChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setForm((prev) => ({ ...prev, deadline: formatDateInputValue(evt.target.value) }))
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async () => {
    // evt.preventDefault();
    
    const body = {
      ...form,
      deadline: form.deadline ? formatToISO8601(form.deadline) : '',
      status: typeof form.status === 'number' ? form.status : task?.taskStatus.id,
      assignee: typeof form.assignee === 'number' ? form.assignee : task?.assigneeUser.id
    };

    if (task === undefined) {
      await createTask(body)
        .then((resp) => console.log(resp));
    } else {
      await editTask(body, task.id)
        .then((resp) => console.log(resp));
    }
  }

  return (
    <div className='fixed inset-0 bg-slate-500/50 flex_center z-40'>
      <form onSubmit={onSubmit} className='flex flex-col items-center p-8 rounded-2xl bg-white gap-6'>
        <div className='flex_col gap-3 w-full'>
          <input
            type='text'
            name='title'
            className='text_input'
            placeholder='Title'
            value={form.title}
            onChange={onTitleChange}
            required
          />
          <textarea
            rows={4}
            name='description'
            className='text_input'
            placeholder='Description'
            value={form.description}
            onChange={onDescriptionChange}
          />
          <input
            type='text'
            name='deadline'
            className='text_input'
            placeholder='Deadline (dd.mm.yyyy)'
            value={form.deadline}
            onChange={handleDeadlineChange}
            required
          />
          <EditorDropdown
            form={form}
            setForm={setForm}
            type='assignee'
          />
          <EditorDropdown
            form={form}
            setForm={setForm}
            type='status'
          />
        </div>
        <div className='flex_between gap-3'>
          <button type='submit' className='button rose h-10 w-40'>
            Save
          </button>
          <button className='button transparent h-10 w-40' onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editor;