import {
	getDatabase,
	ref,
	query,
	orderByChild,
	limitToLast,
	get,
} from "firebase/database";

export const recentMessage = async (userId, friendId) => {
	try {
		const db = getDatabase();
		const messagesRef = ref(db, "messages");

		// Query the latest message between the user and the friend
		const q = query(
			messagesRef,
			orderByChild("sentTime"),
			limitToLast(1) // Limit to the last message
		);

		const snapshot = await get(q);

		if (!snapshot.exists()) {
			return null; // No messages found
		}

		const messages = snapshot.val();
		let lastMessage = null;

		// Iterate through the messages to find the most recent one
		for (let key in messages) {
			const message = messages[key];

			// Check if the message is between the user and the friend, regardless of sender/receiver order
			if (
				(message.senderId === userId && message.receiverId === friendId) ||
				(message.senderId === friendId && message.receiverId === userId)
			) {
				lastMessage = message;
				break; // Once found, break out of the loop
			}
		}

		if (lastMessage) {
			// Add the 'sent' field based on the sender
			lastMessage.sent = lastMessage.senderId === userId;
			return lastMessage; // Return the full message with all details and the 'sent' field
		}

		return null;
	} catch (error) {
		console.error("Error fetching recent message:", error);
		return null;
	}
};
