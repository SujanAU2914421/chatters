import { firestore } from '@/app/components/firebase/firebase-config'; // Correct import
import { doc, getDoc } from 'firebase/firestore'; // Modular imports

// Function to fetch user details by userId
export const getUserDetails = async (userId) => {
  try {
    // Ensure userId is provided
    if (!userId) {
      throw new Error('User ID is required.');
    }

    // Reference to the user's document in the "users" collection
    const userRef = doc(firestore, 'users', userId);

    // Fetch the user's document
    const userSnap = await getDoc(userRef);

    // Check if document exists
    if (!userSnap.exists()) {
      throw new Error('User not found.');
    }

    // Return user data
    return userSnap.data();
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details.');
  }
};
