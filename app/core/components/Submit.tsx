import { useFormContext } from 'react-hook-form';
import Button from './Button';
import { ButtonProps } from './Button.types';

const Submit: React.FC<ButtonProps> = props => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return <Button {...props} type="submit" loading={isSubmitting} />;
};

export default Submit;
