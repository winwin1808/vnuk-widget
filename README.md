# VNUK Chatting SDK

A chat widget component built with React.

## Installation

To install the package, run the following command:

```bash
npm install vnukchatting-js
```

## Usage

To use the chat widget in your project, follow the example below:

```jsx
import React from 'react';
import { WidgetContainer } from 'vnukchatting-js';

const App = () => {
  return (
    <div>
      <WidgetContainer 
        adminId="123321" 
        greeting="Welcome to our support chat!" 
        headerName="Customer Support" 
      />
    </div>
  );
};

export default App;
```

## Configuration

### API Endpoints

You can configure the API endpoints by setting the following environment variables in your `.env` file:

- `REACT_APP_PROD_HOST`: The production API host URL.
- `REACT_APP_DEV_HOST`: The development API host URL.

The package will automatically use the appropriate host based on the `NODE_ENV` environment variable.

## Components

### WidgetContainer

The `WidgetContainer` component manages the state and logic for the chat widget, including fetching messages and handling new messages.

Props:

- `adminId`: The ID of the admin to whom the messages will be sent.
- `greeting`: The initial greeting message (default is "Welcome to our support chat!").
- `headerName`: The name to display in the chat header (default is "Customer Support").

## Development

To start the development server, run:

```bash
npm start
```

To build the package for production, run:

```bash
npm run build
```

## License

This project is licensed under the MIT License.
