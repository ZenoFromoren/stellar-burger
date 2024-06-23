import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { burgerConstructorSelectors } from '../../services/slices/burgerConstructorSlice';
import { orderBurger } from '../../services/thunks/orderThunks';
import { userSelectors } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { orderActions, orderSelectors } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const bun: TConstructorIngredient | null =
    useSelector<TConstructorIngredient | null>(
      burgerConstructorSelectors.selectBun
    );

  const ingredients: TConstructorIngredient[] = useSelector<
    TConstructorIngredient[]
  >(burgerConstructorSelectors.selectIngredients);

  const constructorItems = {
    bun: bun!,
    ingredients: ingredients
  };

  const isAuthenticated = useSelector(userSelectors.selsectIsAuthenticated);

  const orderRequest = useSelector(orderSelectors.selectIsOrderRequest);

  const orderModalData = useSelector(orderSelectors.selectOrderData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(userSelectors.selectUserData);

  const onOrderClick = () => {
    if (isAuthenticated && constructorItems.bun) {
      const bunId: string = constructorItems.bun!._id;
      const ingredientsIds: string[] = constructorItems.ingredients.map(
        (ingredient: TIngredient) => ingredient._id
      );

      const burgerData: string[] = [bunId, ...ingredientsIds, bunId];

      dispatch(orderBurger(burgerData));
    } else if (isAuthenticated && !constructorItems.bun) {
      return;
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(orderActions.closeModalOrder());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    let ingredientsPrice = 0;

    constructorItems.ingredients.forEach(
      (ingredient) => (ingredientsPrice += ingredient.price)
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
