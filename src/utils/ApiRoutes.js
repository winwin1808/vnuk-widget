export const host = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_HOST : process.env.REACT_APP_DEV_HOST;
// export const host = 'http://localhost:5000'
// Message API Routes
export const sendCustomerMessageRoute = `${host}/api/customerMessages/sendMessage`;
export const receiveCustomerMessageRoute = `${host}/api/customerMessages/getMessage`;
export const sendRatingCustomerMessageRoute = `${host}/api/customerMessages/sendRating`;
//Initiate chat
export const initiateChatRoute = `${host}/api/customers/initialize`;
export const conversationStatusRoute = `${host}/api/customers/conversationStatus`;