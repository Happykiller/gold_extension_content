import * as React from 'react';
import { render } from '@testing-library/react';
import Import from './import';

describe('#Import', () => {
  test('should build', () => {
    const result = render(<Import/>);
    expect(result.container.getElementsByClassName('Import')).toBeDefined();
  });
});
