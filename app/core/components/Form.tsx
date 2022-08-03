import React, { useState, ReactNode, PropsWithoutRef } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: any;
}

export type SubmitHandler<S extends z.ZodType<any, any>> = (
  values: z.infer<S>,
) => Promise<void | OnSubmitResult>;

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  schema?: S;
  onSubmit: SubmitHandler<S>;
  initialValues?: UseFormProps<z.infer<S>>['defaultValues'];
}

export const FORM_ERROR = 'FORM_ERROR';

export const Form = <S extends z.ZodType<any, any>>({
  children,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>): React.ReactElement => {
  const ctx = useForm<z.infer<S>>({
    mode: 'onBlur',
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  });
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async values => {
          const result = (await onSubmit(values)) || {};
          Object.entries(result).forEach(([key, value]) => {
            if (key === FORM_ERROR) {
              setFormError(value);
            } else {
              ctx.setError(key as any, {
                type: 'submit',
                message: value,
              });
            }
          });
        })}
        {...props}
      >
        {/* Form fields supplied as children are rendered here */}
        {children}

        {formError && (
          <div role="alert" style={{ color: 'red' }}>
            {formError}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default Form;
