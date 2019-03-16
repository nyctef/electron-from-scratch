import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/index.scss';

const app = document.getElementById('app');

const Emphasis: React.FunctionComponent = props => <em>{props.children}</em>;

const App = () => (
  <div>
    Hello, <Emphasis>world</Emphasis>
  </div>
);

ReactDOM.render(<App />, app);
