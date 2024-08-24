import { expect } from '@jest/globals';
import burgerConstructorReducer, {
  initialState,
  burgerConstructorActions
} from './burgerConstructorSlice';
import { orderBurger } from '../thunks/orderThunks';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: 'test'
};

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0,
  id: 'test'
};

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    id: 'test1'
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    id: 'test2'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    id: 'test3'
  }
];

const filteredMockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    id: 'test2'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    id: 'test1'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    id: 'test3'
  }
];

const mockOrder = {
  _id: '66c75bc6119d45001b501723',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0942',
    '643d69a5c3f7b9001cfa093c'
  ],
  owner: '66c5df17119d45001b5012d3',
  status: 'done',
  name: 'Краторный spicy био-марсианский бургер',
  createdAt: '2024-08-22T15:39:50.837Z',
  updatedAt: '2024-08-22T15:39:51.414Z',
  number: 50636,
  __v: 0
};

describe('тест burgerConstructorSlice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('проверка экшена добавления булки', () => {
    const newBurgerConstructorState = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.addIngredient(mockBun)
    );

    expect(newBurgerConstructorState.bun).not.toBeNull();
    expect({ ...newBurgerConstructorState.bun, id: 'test' }).toEqual(mockBun);
  });

  it('проверка экшена добавления ингредиента', () => {
    const newBurgerConstructorState = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.addIngredient(mockIngredient)
    );

    expect(newBurgerConstructorState.burgerConstructoringredients).toHaveLength(
      1
    );
    expect({
      ...newBurgerConstructorState.burgerConstructoringredients[0],
      id: 'test'
    }).toEqual(mockIngredient);
  });

  it('проверка экшена удаления ингридиента', () => {
    let newBurgerConstructorState = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.addIngredient(mockIngredient)
    );

    expect(newBurgerConstructorState.burgerConstructoringredients).toHaveLength(
      1
    );
    expect({
      ...newBurgerConstructorState.burgerConstructoringredients[0],
      id: 'test'
    }).toEqual(mockIngredient);

    newBurgerConstructorState = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.removeIngredient(mockIngredient)
    );

    expect(newBurgerConstructorState.burgerConstructoringredients).toHaveLength(
      0
    );
    expect(
      newBurgerConstructorState.burgerConstructoringredients[0]
    ).toBeUndefined();
  });

  it('проверка экшена изменения порядка ингредиентов в начинке', () => {
    const newInitialState = {
      ...initialState,
      burgerConstructoringredients: mockIngredients
    };

    let newBurgerConstructorState = burgerConstructorReducer(
      newInitialState,
      burgerConstructorActions.moveIngredientUp(1)
    );

    expect(newBurgerConstructorState.burgerConstructoringredients).toHaveLength(
      3
    );
    expect(newBurgerConstructorState.burgerConstructoringredients).toEqual(
      filteredMockIngredients
    );

    newBurgerConstructorState = burgerConstructorReducer(
      newInitialState,
      burgerConstructorActions.moveIngredientDown(0)
    );

    expect(newBurgerConstructorState.burgerConstructoringredients).toHaveLength(
      3
    );
    expect(newBurgerConstructorState.burgerConstructoringredients).toEqual(
      filteredMockIngredients
    );
  });

  it('проверка в состоянии orderBurger.pending', () => {
    const newOrderState = burgerConstructorReducer(
      initialState,
      orderBurger.pending('isPending', ['1'])
    );

    expect(newOrderState.isOrderRequest).toBeTruthy();
    expect(newOrderState.error).toBeUndefined();
  });

  it('проверка в состоянии orderBurger.fulfiled', () => {
    const newBurgerConstructorState = burgerConstructorReducer(
      initialState,
      orderBurger.fulfilled(mockOrder, 'isFulfilled', ['1'])
    );

    expect(newBurgerConstructorState.isOrderRequest).toBeFalsy();
    expect(newBurgerConstructorState.error).toBeUndefined();
    expect(newBurgerConstructorState.bun).toBeNull();
    expect(newBurgerConstructorState.burgerConstructoringredients).toHaveLength(
      0
    );
  });

  it('проверка в состоянии orderBurger.rejected', () => {
    const error = new Error('Возникла ошибка при создании заказа');

    const newOrderState = burgerConstructorReducer(
      initialState,
      orderBurger.rejected(error, 'isRejected', ['1'])
    );

    expect(newOrderState.isOrderRequest).toBeFalsy();
    expect(newOrderState.error).toEqual(error.message!);
  });
});
