import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import Test from './test';

const App: React.FC = () => (
  <>
    <h1>Hello</h1>

    <Test />
  </>
);

export default hot(App);