import {
	getDatabase,
	ref,
	query,
	orderByChild,
	equalTo,
	onChildAdded,
	off,
} from "firebase/database";

export const listenForMessageChanges = (
	userId,
	currentChatUserId,
	setCurrentChatMessages
) => {
	const db = getDatabase();
	const messagesRef = ref(db, "messages");

	// Create a query to fetch only messages between the current user and chat user
	const messagesQuery = query(
		messagesRef,
		orderByChild("chatId"),
		equalTo(`${userId}_${currentChatUserId}`)
	);

	// Track seen messages to avoid infinite processing
	const seenMessages = new Set();

	const handleChildAdded = (snapshot) => {
		const message = snapshot.val();

		// Only process new messages
		if (!seenMessages.has(message.id)) {
			seenMessages.add(message.id); // Mark the message as seen

			// Add the 'sent' field (true if sent by the current user, false if received)
			message.sent = message.senderId === userId;

			// Update the messages state in the parent component
			setCurrentChatMessages((prevMessages) => [...prevMessages, message]);
		}
	};

	// Attach the listener
	onChildAdded(messagesQuery, handleChildAdded);

	// Return a cleanup function
	return () => {
		off(messagesQuery, "child_added", handleChildAdded);
	};
};
