import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/thunks/ingredientsThunks';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { ingredientsSelectors } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredientsList: TIngredient[] = useSelector<TIngredient[]>(
    ingredientsSelectors.selectIngredients
  );

  const isLoading = useSelector(ingredientsSelectors.selectIsLoading);

  const params = useParams();

  const id = params.id;

  const ingredientData = ingredientsList.find(
    (ingredient) => ingredient._id === id
  )!;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
