import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  off,
} from 'firebase/database';
import { fetchMessages } from './fetchAllCurrentChat';

// Function to fetch messages when any data changes in real-time
export const listenForMessageChangesAndFetch = (
  userId,
  currentChatUserId,
  setCurrentChatMessages,
  allChats,
  setAllChats
) => {
  const db = getDatabase();

  // Dynamically create the conversation reference between userId and currentChatUserId
  const conversationKey1 = `${userId}_${currentChatUserId}`;
  const conversationKey2 = `${currentChatUserId}_${userId}`;

  // Reference for the conversation node
  const messagesRef1 = ref(db, `messages/${conversationKey1}`);
  const messagesRef2 = ref(db, `messages/${conversationKey2}`);

  try {
    // Step 1: Fetch all messages initially by calling fetchMessages
    fetchMessages(userId, currentChatUserId, setCurrentChatMessages);

    // Step 2: Listen for real-time changes in messages
    const handleChildAdded = (snapshot) => {
      const message = snapshot.val();
      if (!message) return;

      // Fetch the current chat messages after a new message is added
      fetchMessages(userId, currentChatUserId, setCurrentChatMessages);
    };

    const handleChildChanged = (snapshot) => {
      const message = snapshot.val();
      if (!message) return;

      // Fetch the current chat messages after a message is changed
      fetchMessages(userId, currentChatUserId, setCurrentChatMessages);
    };

    const handleChildRemoved = (snapshot) => {
      const message = snapshot.val();
      if (!message) return;

      // Fetch the current chat messages after a message is removed
      fetchMessages(userId, currentChatUserId, setCurrentChatMessages);
    };

    // Step 3: Attach real-time listeners for new, changed, and removed messages
    onChildAdded(messagesRef1, handleChildAdded);
    onChildChanged(messagesRef1, handleChildChanged);
    onChildRemoved(messagesRef1, handleChildRemoved);

    // If no messages exist under the first key, try the second key
    onChildAdded(messagesRef2, handleChildAdded);
    onChildChanged(messagesRef2, handleChildChanged);
    onChildRemoved(messagesRef2, handleChildRemoved);

    // Step 4: Cleanup listeners when no longer needed
    return () => {
      off(messagesRef1, 'child_added', handleChildAdded);
      off(messagesRef1, 'child_changed', handleChildChanged);
      off(messagesRef1, 'child_removed', handleChildRemoved);

      off(messagesRef2, 'child_added', handleChildAdded);
      off(messagesRef2, 'child_changed', handleChildChanged);
      off(messagesRef2, 'child_removed', handleChildRemoved);
    };
  } catch (error) {
    setCurrentChatMessages([]); // Handle error gracefully by setting empty state
  }
};
