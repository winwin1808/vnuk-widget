
# VNUK Chatting SDK

A chat widget component built with React.

## Installation

To install the package, run the following command:

```bash
npm install vnuk-chatting-sdk
```

## Usage

To use the chat widget in your project, follow the example below:

```jsx
import React from 'react';
import { WidgetContainer } from 'vnuk-chatting-sdk';

const App = () => {
  return (
    <div>
      <WidgetContainer greeting="Welcome to our support chat!" />
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

### Widget

The `Widget` component is responsible for rendering the chat interface.

Props:

- `remoteName`: The name of the remote user (default is "TestTest").
- `messages`: An array of message objects.
- `onSend`: A function to handle sending messages.

### WidgetContainer

The `WidgetContainer` component manages the state and logic for the chat widget, including fetching messages and handling new messages.

Props:

- `license`: The license key for the widget (default is an empty string).
- `greeting`: The initial greeting message (default is "Hello").

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
