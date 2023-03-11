import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NewTabLink } from '../NewTabLink';

describe('CounterButton', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <NewTabLink href="https://nextjs.org/">Next.js</NewTabLink>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
