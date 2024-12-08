import { ref, onChildAdded, onChildChanged, off } from "firebase/database";
import { database } from "@/app/components/firebase/firebase-config";

// Function to listen for new messages and update the latest message when the current user is involved
export const listenForLatestMessage = (userId, setAllChats, allChats) => {
	try {
		const messagesRef = ref(database, "messages");

		const handleChildAdded = (snapshot) => {
			const messageArray = snapshot.val();

			// Iterate over the array of messages
			for (const messageId in messageArray) {
				const message = messageArray[messageId];

				// Check if the current user is involved in this message
				if (message.senderId === userId || message.receiverId === userId) {
					// Update the user's individual data to include the latest message
					setAllChats((prevChats) => {
						const updatedChats = [...prevChats];

						// Find the chat corresponding to the current user and the other user
						const chatIndex = updatedChats.findIndex(
							(chat) =>
								chat.userId === message.senderId ||
								chat.userId === message.receiverId
						);

						if (chatIndex > -1) {
							const userChat = updatedChats[chatIndex];

							// Ensure userChat has a field for latest message (initialize if missing)
							userChat.latestMessage = userChat.latestMessage || {};

							// Check if this message is newer than the current one (if any)
							if (
								!userChat.latestMessage.messageId ||
								userChat.latestMessage.sendTime < message.sendTime
							) {
								userChat.latestMessage = {
									message: message.message,
									sendTime: message.sendTime,
									messageId: messageId,
									sent: message.senderId === userId, // Sent if senderId matches userId
								};

								// If the user is the receiver, set sent to false
								if (message.receiverId === userId) {
									userChat.latestMessage.sent = false;
								}
							}
						}

						return updatedChats;
					});
				}
			}
		};

		const handleChildChanged = (snapshot) => {
			const messageArray = snapshot.val();

			// Iterate over the array of messages
			for (const messageId in messageArray) {
				const message = messageArray[messageId];

				// Check if the current user is involved in this updated message
				if (message.senderId === userId || message.receiverId === userId) {
					// Update the user's individual data to reflect the updated message
					setAllChats((prevChats) => {
						const updatedChats = [...prevChats];

						// Find the chat corresponding to the current user and the other user
						const chatIndex = updatedChats.findIndex(
							(chat) =>
								chat.userId === message.senderId ||
								chat.userId === message.receiverId
						);

						if (chatIndex > -1) {
							const userChat = updatedChats[chatIndex];

							// Ensure userChat has a field for latest message (initialize if missing)
							userChat.latestMessage = userChat.latestMessage || {};

							// Check if this message is newer than the current one (if any)
							if (userChat.latestMessage.sendTime < message.sendTime) {
								userChat.latestMessage = {
									message: message.message,
									sendTime: message.sendTime,
									messageId: messageId,
									sent: message.senderId === userId, // Sent if senderId matches userId
								};

								// If the user is the receiver, set sent to false
								if (message.receiverId === userId) {
									userChat.latestMessage.sent = false;
								}
							}
						}

						return updatedChats;
					});
				}
			}
		};

		// Set up listeners for new and updated messages
		onChildAdded(messagesRef, handleChildAdded);
		onChildChanged(messagesRef, handleChildChanged);

		// Cleanup: Unsubscribe when the component is unmounted
		return () => {
			off(messagesRef, "child_added", handleChildAdded);
			off(messagesRef, "child_changed", handleChildChanged);
		};
	} catch (error) {}
};
