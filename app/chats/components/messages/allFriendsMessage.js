import React, { useEffect, useState } from 'react';
import { listenForLatestMessage } from './listenToAllNewMessages';

export const AllFriendsMessage = ({
  allChats,
  currentChat,
  setAllChats,
  setCurrentChat,
  getOfflineDuration,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId && userId.trim() !== '') {
      // Fetch the most recent messages for each friend when component mounts
      const fetchMessages = async () => {
        try {
          setIsLoading(true); // Start loading

          // Fetch all latest messages for each friend
          await updateAllChatsWithLatestMessages(userId, allChats, setAllChats)
            .then(() => {})
            .catch((error) => {});
        } catch (error) {
        } finally {
          setIsLoading(false); // Stop loading
        }
      };

      fetchMessages();

      // Call the listenForLatestMessage function after messages are fetched
      const unsubscribe = listenForLatestMessage(userId, setAllChats, allChats);

      // Cleanup: Unsubscribe when the component is unmounted
      return unsubscribe; // Unsubscribes from Firebase listeners
    }
  }, []); // Empty dependency array to only run once when the component mounts

  // Show loading message while fetching
  if (isLoading) {
    return '';
  }

  // Sort allChats based on the sendTime of the latest message
  const sortedChats = [...allChats].sort((a, b) => {
    const aMessage = a.latestMessage;
    const bMessage = b.latestMessage;

    // If both have messages, sort by sendTime
    if (aMessage && bMessage) {
      return bMessage.sendTime - aMessage.sendTime; // Sort in descending order by sendTime
    }

    // If one doesn't have a message, place them at the end
    if (aMessage && !bMessage) return -1;
    if (!aMessage && bMessage) return 1;

    // If both don't have messages, they are placed in the order they were received
    return 0;
  });

  return (
    <div className="relative h-auto w-full pt-2">
      {sortedChats.length > 0 &&
        sortedChats.map((user, index) => {
          const userId = localStorage.getItem('userId');

          if (user.userId === userId) {
            return null; // Exclude current user from the list
          }

          // Get the most recent message for this user-friend pair directly from sortedChats[index].latestMessage
          const recentMsg = user.latestMessage || {}; // Default to empty object if no message exists

          let messageText = 'Start conversation now!'; // Default message if no recent message

          if (recentMsg.message) {
            if (recentMsg.sent) {
              // Sent by the current user
              messageText = `You: ${recentMsg.message}`;
            } else {
              // Sent by the other user
              messageText = recentMsg.message;
            }
          }

          return (
            <div key={index} className="relative h-auto w-full pt-3">
              <div
                onClick={() => {
                  setCurrentChat(user);
                  getOfflineDuration(currentChat.lastOnline);
                }}
                className={`relative h-16 px-3 cursor-pointer w-full flex gap-4 items-center ${
                  user.userId !== currentChat?.userId
                    ? 'hover:bg-gray-200 bg-transparent'
                    : 'bg-gray-200'
                } duration-300 rounded-xl`}
              >
                <div className="relative h-12 w-12 rounded-full">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'url(/assets/images/img2.jpg)',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  ></div>

                  {/* Online indicator */}
                  {user.online && (
                    <div className="absolute h-4 w-5 right-0 top-0 rounded-full bg-white flex items-center justify-center">
                      <div className="relative h-2 w-2 rounded-full bg-green-600"></div>
                    </div>
                  )}
                </div>

                <div className="relative h-auto w-auto">
                  <div className="relative text-sm font-medium text-gray-800">
                    {user.username}
                  </div>
                  <div className="relative text-xs font-medium text-gray-700 pt-1">
                    {/* Display message text based on conditions */}
                    {messageText}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
