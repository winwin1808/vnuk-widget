import React from 'react';
import { WidgetContainer } from './components/WidgetContainer';

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat Widget Demo</h1>
      <WidgetContainer greeting="Welcome to our support chat!" />
    </div>
  );
};

export default App;
