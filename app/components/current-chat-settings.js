import React, { useEffect, useState } from 'react';
import { blockUser } from '../chats/components/blockUsers';

export default function CurrentChatSettings({
  currentChat,
  userDetail,
  setUsersDetails,
  setLoading,
}) {
  const [changingNickName, setChangingNickName] = useState(false);
  useEffect(() => {
    console.log(currentChat.username);
  }, [currentChat]);

  // Check if the currentChat userId is in the userDetail's blocked list
  const isBlocked = userDetail?.blocked?.some(
    (blockedUser) => blockedUser.userId === currentChat?.userId
  );

  return (
    <div className="relative w-[30rem] h-full">
      <div className="relative h-full w-full">
        <div className="relative h-[calc(100%-8rem)] w-full">
          <div className="relative h-auto w-full flex justify-center">
            <div
              className="relative h-40 w-40 rounded-full"
              style={{
                background: 'url(/assets/images/loginpageimg.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
          <div className="relative w-full h-auto">
            <div className="relative w-full text-center text-xl pt-8 font-bold">
              {currentChat.username}
            </div>
            <div className="relative"></div>
            <div className="relative w-full text-center text-sm pt-2">
              {changingNickName ? (
                <div className="relative h-auto w-full flex justify-center">
                  <div
                    onClick={() => {
                      setChangingNickName(false);
                    }}
                    className="relative h-10 w-10 flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <div className="relative h-10 w-64 bg-white rounded border flex items-center justify-center text-xs font-bold">
                    <input
                      type="text"
                      className="bg-transparent outline-none h-full w-full border-none px-4"
                      placeholder="New NickName"
                    />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setChangingNickName(true);
                  }}
                  className="relative cursor-pointer"
                >
                  Set NickName?
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            {
              blockUser(currentChat.userId, setUsersDetails, setLoading);
            }
          }}
          className="relative w-full h-32 flex px-10 items-center"
        >
          <div
            className={`relative w-full h-9 rounded-md text-center duration-200 text-xs font-bold ${
              isBlocked
                ? 'text-green-400 hover:bg-green-400 hover:text-white border-green-400'
                : 'text-red-400 hover:bg-red-400 hover:text-white border-red-400'
            } hover:border-none flex items-center justify-center cursor-pointer`}
          >
            {isBlocked ? 'Unblock?' : 'Block?'}
          </div>
        </div>
      </div>
    </div>
  );
}
