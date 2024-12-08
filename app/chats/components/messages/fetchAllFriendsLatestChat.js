import {
  getDatabase,
  ref,
  query,
  orderByChild,
  limitToLast,
  get,
} from 'firebase/database';

// Fetch the latest message for a specific pair of users
const fetchLatestMessageForPair = async (userId, senderId, receiverId) => {
  const db = getDatabase();

  // Define references for both key formats
  const messagesRef = ref(db, `messages/${senderId}_${receiverId}`);
  const reverseMessagesRef = ref(db, `messages/${receiverId}_${senderId}`);

  // Query the latest message for both directions
  const messagesQuery = query(
    messagesRef,
    orderByChild('sendTime'),
    limitToLast(1)
  );
  const reverseMessagesQuery = query(
    reverseMessagesRef,
    orderByChild('sendTime'),
    limitToLast(1)
  );

  // Fetch messages concurrently
  const [messagesSnapshot, reverseMessagesSnapshot] = await Promise.all([
    get(messagesQuery),
    get(reverseMessagesQuery),
  ]);

  let latestMessage = null;

  // Determine the latest message from both references
  if (messagesSnapshot.exists()) {
    const messages = Object.values(messagesSnapshot.val());
    latestMessage = { ...messages[0], sent: userId === senderId }; // Add sent: true/false
  }
  if (reverseMessagesSnapshot.exists()) {
    const reverseMessages = Object.values(reverseMessagesSnapshot.val());
    if (
      !latestMessage ||
      reverseMessages[0].sendTime > latestMessage.sendTime
    ) {
      latestMessage = { ...reverseMessages[0], sent: userId === receiverId }; // Add sent: true/false
    }
  }

  return latestMessage;
};

// Update allChats with the latest message and sent property
export const updateAllChatsWithLatestMessages = async (
  userId,
  allChats,
  setAllChats
) => {
  const db = getDatabase();

  // Fetch the latest message for each friend in allChats
  const promises = allChats.map(async (friend) => {
    const latestMessage = await fetchLatestMessageForPair(
      userId,
      userId,
      friend.id
    );

    // Return the updated friend object with latest message and sent
    return latestMessage
      ? {
          ...friend,
          message: latestMessage.message,
          sent: latestMessage.sent,
          sendTime: latestMessage.sendTime,
        }
      : friend; // If no message, return the original friend object
  });

  // Wait for all promises to resolve
  const updatedChats = await Promise.all(promises);

  // Update state with the new data
  setAllChats(updatedChats);
};
