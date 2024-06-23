import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { ingredientsSelectors } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredientsList = useSelector(ingredientsSelectors.selectIngredients);

  const params = useParams();

  const id = params.id;

  const ingredientData = ingredientsList.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
