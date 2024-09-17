import Typography from '@mui/material/Typography';
import InputForm from './components/InputForm';

export default function Home() {
  return (
    <div>
      <Typography variant="h4" component="h1">Решение квадратного уравнения</Typography>
      <InputForm />
    </div>
  );
}