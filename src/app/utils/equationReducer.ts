import { EquationResult } from './equationSolver';
import { Coefficients } from './interfaces';

export type State = {
  y: number | null;
  showGraph: boolean;
  coefficients: Coefficients | null;
  result: EquationResult | null;
};

export type Action = 
  | { type: 'SET_Y'; payload: number | null }
  | { type: 'SET_SHOW_GRAPH'; payload: boolean }
  | { type: 'SET_COEFFICIENTS'; payload: Coefficients | null }
  | { type: 'SET_RESULT'; payload: EquationResult | null }; 

export const initialState: State = {
  y: null,
  showGraph: false,
  coefficients: null,
  result: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_Y':
      return { ...state, y: action.payload };
    case 'SET_SHOW_GRAPH':
      return { ...state, showGraph: action.payload };
    case 'SET_COEFFICIENTS':
      return { ...state, coefficients: action.payload };
    case 'SET_RESULT':
      return { ...state, result: action.payload };
    default:
      return state;
  }
};