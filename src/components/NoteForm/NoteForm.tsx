import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

import type { NoteTag } from '../../types/note';
import type { CreateNoteData } from '../../services/noteService';

import css from './NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (values: CreateNoteData) => void;
  onCancel: () => void;
}

const initialValues: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .required('Title is required'),

  content: Yup.string()
    .max(500, 'Content is too long')
    .required('Content is required'),

  tag: Yup.string()
    .oneOf<NoteTag>(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const handleSubmit = (
    values: CreateNoteData,
    actions: FormikHelpers<CreateNoteData>,
  ) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>

          <Field className={css.input} type="text" id="title" name="title" />

          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>

          <Field
            className={css.textarea}
            as="textarea"
            id="content"
            name="content"
            rows={8}
          />

          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field className={css.select} as="select" id="tag" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
        </div>

        <div className={css.actions}>
          <button className={css.cancelButton} type="button" onClick={onCancel}>
            Cancel
          </button>

          <button className={css.submitButton} type="submit">
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
