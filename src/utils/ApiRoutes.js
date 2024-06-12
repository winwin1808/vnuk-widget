export const host = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_HOST : process.env.REACT_APP_DEV_HOST;

// Message API Routes
export const sendMessageRoute = `${host}/api/customerMessages/sendMessage`;
export const receiveMessageRoute = `${host}/api/customerMessages/getMessage`;
