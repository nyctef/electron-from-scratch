import * as React from 'react';
import * as ReactDOM from 'react-dom';

const app = document.getElementById('app');

const Emphasis = (props: any) => <em>{props.children}</em>;

const App = () => (
  <div>
    Hello, <Emphasis>world</Emphasis>
  </div>
);

ReactDOM.render(<App />, app);
