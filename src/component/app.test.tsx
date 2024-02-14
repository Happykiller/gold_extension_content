import * as React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('#App', () => {
  test('should build', () => {
    const result = render(<App/>);
    expect(result.container.getElementsByClassName('App')).toBeDefined();
  });
});
