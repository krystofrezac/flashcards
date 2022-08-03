import { useFormContext } from 'react-hook-form';
import { TextInputProps } from './TextInput.types';

const TextInput: React.FC<TextInputProps> = props => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const errorValue = errors[props.name];
  const error = Array.isArray(errorValue)
    ? errorValue?.join(', ')
    : errorValue?.message || errorValue;

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input
        type="text"
        className="input input-bordered w-full"
        disabled={isSubmitting}
        {...register(props.name)}
      />
      <label className="label">
        <span
          className={`label-text-alt text-error transition-opacity opacity-0 ${
            error ? 'opacity-100' : ''
          }`}
        >
          {`${error?.toString()} `}
        </span>
      </label>
    </div>
  );
};

export default TextInput;
