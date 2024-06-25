import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ordersSelectors } from '../../services/slices/ordersSlice';
import { getOrdersAll } from '../../services/thunks/ordersThunks';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector<TOrder[]>(ordersSelectors.selectOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAll());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
