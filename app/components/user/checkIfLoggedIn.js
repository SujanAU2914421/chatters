import { getUserIdFromLocalStorage } from './handleLocalStorage';

export const checkIfLoggedIn = () => {
  const userId = getUserIdFromLocalStorage();
  if (userId) {
    console.log('User is logged in.');
    window.location.pathname = '/chats';
    // Proceed with user-specific actions
  } else {
    console.log('User is not logged in.');
    // Redirect to login page
  }
};
