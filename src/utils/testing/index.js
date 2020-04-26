import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from 'app/store';

export * from '@testing-library/react';

//const getByTextWithout

export const reduxRender = (
  ui,
  {
    preloadedState = {},
    store = configureStore({reducer, preloadedState}),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

