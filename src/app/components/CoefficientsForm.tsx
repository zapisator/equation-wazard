import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import NumberInput from './NumberInput';
import { CoefficientsInput } from '../utils/interfaces';

interface CoefficientsFormProps {
  onSubmit: (data: CoefficientsInput) => void;
}

const CoefficientsForm: React.FC<CoefficientsFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CoefficientsInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NumberInput label="a" name="a" register={register} errors={errors} />
      <NumberInput label="b" name="b" register={register} errors={errors} />
      <NumberInput label="c" name="c" register={register} errors={errors} />
      <Button variant="contained" type="submit">
        Рассчитать
      </Button>
    </form>
  );
};

export default CoefficientsForm;