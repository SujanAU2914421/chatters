import { getDatabase, ref, runTransaction, get, set } from 'firebase/database';

// Function to save a message to the database
export const saveMessage = async (senderId, receiverId, message) => {
  if (!senderId || !receiverId || !message) {
    console.log('Invalid input parameters for saving the message.');
    return;
  }

  try {
    const db = getDatabase();

    // Define the paths for both possible message paths
    const messagesRef = ref(db, `messages/${senderId}_${receiverId}`);
    const reverseMessagesRef = ref(db, `messages/${receiverId}_${senderId}`);

    console.log(`Attempting to save message from ${senderId} to ${receiverId}`);

    // Create the new message data with the current timestamp as sendTime
    const newMessage = {
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      sendTime: Date.now(), // Use current timestamp for sendTime
    };

    console.log('New message object created:', newMessage);

    // Step 1: Check if sender_receiver path exists
    const senderReceiverSnapshot = await get(messagesRef);

    if (senderReceiverSnapshot.exists()) {
      console.log(
        'Messages exist at sender_receiver path. Appending new message.'
      );
      // Add message to sender_receiver path
      await runTransaction(messagesRef, (currentMessages) => {
        if (currentMessages === null) {
          return {
            [`message_${newMessage.sendTime}`]: newMessage,
          };
        } else {
          const newMessageId = `message_${newMessage.sendTime}`;
          currentMessages[newMessageId] = newMessage;
          return currentMessages;
        }
      });
    } else {
      // Step 2: Check if reverse path exists if sender_receiver does not exist
      const reverseMessagesSnapshot = await get(reverseMessagesRef);

      if (reverseMessagesSnapshot.exists()) {
        console.log(
          'Messages exist at receiver_sender path. Appending new message.'
        );
        // Add message to receiver_sender path
        await runTransaction(reverseMessagesRef, (currentMessages) => {
          if (currentMessages === null) {
            return {
              [`message_${newMessage.sendTime}`]: newMessage,
            };
          } else {
            const newMessageId = `message_${newMessage.sendTime}`;
            currentMessages[newMessageId] = newMessage;
            return currentMessages;
          }
        });
      } else {
        // Step 3: If neither path exists, create only the sender_receiver path and add the message
        console.log(
          'Both paths do not exist. Creating new messages at sender_receiver path.'
        );
        await set(messagesRef, {
          [`message_${newMessage.sendTime}`]: newMessage,
        });
      }
    }

    console.log('Message saved successfully!');

    return 'Message saved'; // Return some status or message ID
  } catch (error) {
    console.log('Error saving the message:', error);
  }
};
