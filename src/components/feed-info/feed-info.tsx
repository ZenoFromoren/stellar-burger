import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import { feedsSelectors } from '../../services/slices/feedSlice';
import { getFeeds } from '../../services/thunks/feedThunks';
import { getOrdersAll } from '../../services/thunks/ordersThunks';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(feedsSelectors.selectFeeds);
  const total: number = useSelector(feedsSelectors.selectTotalFeeds);
  const totalToday: number = useSelector(feedsSelectors.selectTotalTodayFeeds);

  const feed = { total, totalToday };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, [dispatch]);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
