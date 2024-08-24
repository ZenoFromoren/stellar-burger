describe('проверка конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('добавление ингридиентов', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]')
      .contains('Добавить')
      .click();
    cy.get('[data-testid=643d69a5c3f7b9001cfa0941]')
      .contains('Добавить')
      .click();
    cy.get('[data-testid=643d69a5c3f7b9001cfa0942]')
      .contains('Добавить')
      .click();

    cy.get(`[data-testid='bun']`)
      .find('div')
      .then(($div) =>
        expect($div).to.have.text('Краторная булка N-200i (верх)1255')
      );
    cy.get(`[data-testid='ingredients']`)
      .find('.constructor-element')
      .then((ingredients) => {
        expect(ingredients[0]).to.have.text(
          'Биокотлета из марсианской Магнолии424'
        );
        expect(ingredients[1]).to.have.text('Соус Spicy-X90');
      });
  });
});

describe('проверка работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').click();
    cy.get('[data-testid=modal]').should('exist');
  });

  it('проверка открытия и закрытия модальных окон по кнопке', () => {
    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('проверка открытия и закрытия модальных окон по esc', () => {
    cy.get('body').type('{esc}');
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('проверка открытия и закрытия модальных окон по оверлею', () => {
    cy.get('body').click('topLeft');
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('проверка, что открыто модальное окно правильного ингредиента', () => {
    cy.get('[data-testid=modal]')
      .find('h3')
      .then(($h3) => {
        expect($h3[0]).to.have.text('Детали ингредиента');
        expect($h3[1]).to.have.text('Краторная булка N-200i');
      });
  });
});

describe('проверка оформления заказа', () => {
  beforeEach(() => {
    localStorage.setItem('refreshToken', 'fakeRefreshToken');
    cy.setCookie('accessToken', 'fakeAccessToken');

    cy.intercept('GET', '/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    cy.visit('/');

    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]')
      .contains('Добавить')
      .click();
    cy.get('[data-testid=643d69a5c3f7b9001cfa0941]')
      .contains('Добавить')
      .click();
    cy.get('[data-testid=643d69a5c3f7b9001cfa0942]')
      .contains('Добавить')
      .click();
  });

  afterEach(() => {
    localStorage.clear();
    cy.clearCookie('accessToken');
  });

  it('проверка добавления ингридиентов в конструктор бургера', () => {
    cy.get(`[data-testid='bun']`)
      .find('div')
      .then(($div) =>
        expect($div).to.have.text('Краторная булка N-200i (верх)1255')
      );

    cy.get(`[data-testid='ingredients']`)
      .find('.constructor-element')
      .then((ingredients) => {
        expect(ingredients[0]).to.have.text(
          'Биокотлета из марсианской Магнолии424'
        );
        expect(ingredients[1]).to.have.text('Соус Spicy-X90');
      });
  });

  it('проверка отображения модального окна с верным номером заказа, и очистки конструктора бургера от добавленных ингредиентов', () => {
    cy.get('button').contains('Оформить заказ').click();

    cy.get('[data-testid=modal]').should('exist');
    cy.get('[data-testid=modal]')
      .find('h2')
      .then(($h2) => expect($h2).to.have.text('50420'));

    cy.get('[data-testid=modal-close]').click();
    cy.get('[data-testid=modal]').should('not.exist');

    cy.get(`[data-testid='no-buns']`).should('exist');
    cy.get(`[data-testid='no-ingredients']`).should('exist');
  });
});
