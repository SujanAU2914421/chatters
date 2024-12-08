"use client";
import { useMainContext } from "@/context/mainContext";
import React, { useEffect, useState } from "react";
import { checkUserStatus } from "./component/checkUserStatus";
import { addFriend } from "../chats/components/addFriend";
import { unblockUser } from "../chats/components/unblockUser";
import { updateUserDetails } from "../chats/components/updateAllUsersDetails";
import { removeFriend } from "../chats/components/removeFriend";
import SideBar from "../components/side-bar";
import { checkIfLoggedIn } from "../components/user/checkIfLoggedIn";
import { getUserIdFromLocalStorage } from "../components/user/handleLocalStorage";

export default function FindPeople() {
	const { usersDetails = [], setUsersDetails, setLoading } = useMainContext();
	const [searchFor, setSearchFor] = useState("");
	const [currentUser, setCurrentUser] = useState(null);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		updateUserDetails(setLoading, setUsersDetails);
	}, [setLoading, setUsersDetails]);

	useEffect(() => {
		if (Array.isArray(usersDetails) && userId) {
			setCurrentUser(
				usersDetails.find((user) => user.userId === userId) || null
			);
		}
	}, [usersDetails, userId]);

	const countMutualFriends = (user) => {
		if (!currentUser || !currentUser.friends || !user.friends) return 0;

		const mutualFriends = currentUser.friends.filter((friend) =>
			user.friends.some((friendUser) => friendUser.userId === friend.userId)
		);
		return mutualFriends.length;
	};

	const filteredUsers = usersDetails
		.filter(
			(user) =>
				user?.username?.toLowerCase().includes(searchFor.toLowerCase()) &&
				currentUser?.userId !== user.userId
		)
		.sort((a, b) => a.username.localeCompare(b.username));

	useEffect(() => {
		const userId = getUserIdFromLocalStorage();
		if (!userId) {
			window.location.pathname = "/login";
			// Proceed with user-specific actions
		}
	}, []);

	return (
		<div className="relative h-screen w-screen overflow-hidden font-mono">
			<div className="fixed z-10 h-full w-16 bg-gray-800 shadow-md shadow-gray-700">
				<SideBar />
			</div>
			<div className="relative h-full w-full overflow-y-auto text-black">
				<div className="relative h-auto w-auto py-32">
					<div className="relative h-auto w-auto">
						<div className="relative h-auto w-full flex justify-center">
							<div className="relative text-md font-medium font-sans text-gray-700">
								Search new friend
							</div>
						</div>
						<div className="relative h-auto w-full flex justify-center pt-8 items-center gap-5">
							<div className="relative h-10 w-[20rem] rounded-full border flex items-center justify-center">
								<input
									type="text"
									placeholder="Search"
									id="usernameInputField"
									onChange={(e) => setSearchFor(e.target.value)}
									className="relative h-full w-full bg-transparent px-4 text-sm outline-none"
								/>
							</div>
						</div>
					</div>
					<div className="relative h-auto w-auto grid justify-center pt-8 gap-5 font-mono">
						{filteredUsers.map((user) => {
							const userStatus = checkUserStatus(user, currentUser);
							const mutualFriendsCount = countMutualFriends(user);

							return (
								<div
									key={user.userId}
									className="relative h-20 w-[25rem] border rounded-xl flex justify-between"
								>
									<div className="relative h-full flex items-center">
										<div className="relative pl-8">
											<div className="relative text-sm font-extrabold text-gray-800">
												{user.username}
											</div>
											<div className="relative text-xs pt-1">
												{mutualFriendsCount > 0
													? `${mutualFriendsCount} mutual friend${
															mutualFriendsCount > 1 ? "s" : ""
													  }`
													: "No mutual friends"}
											</div>
										</div>
									</div>
									<div className="relative pt-4 pr-5">
										{userStatus === "add" && (
											<div
												onClick={() =>
													addFriend(
														user.userId,
														setLoading,
														usersDetails,
														setUsersDetails
													)
												}
												className="relative h-10 w-40 rounded-md bg-gray-600 hover:bg-gray-800 cursor-pointer text-xs text-white flex items-center justify-center"
											>
												Add friend?
											</div>
										)}
										{userStatus === "remove" && (
											<div
												onClick={() =>
													removeFriend(
														user.userId,
														setLoading,
														usersDetails,
														setUsersDetails
													)
												}
												className="relative h-10 w-40 rounded-md border hover:bg-gray-800 hover:text-white cursor-pointer text-xs flex items-center justify-center"
											>
												Remove friend?
											</div>
										)}
										{userStatus === "unblock" && (
											<div
												onClick={() =>
													unblockUser(user.userId, setUsersDetails, setLoading)
												}
												className="relative h-10 w-40 rounded-md border hover:bg-gray-800 hover:text-white cursor-pointer text-xs flex items-center justify-center"
											>
												Unblock?
											</div>
										)}
										{userStatus === "acceptRequest" && (
											<div
												onClick={() =>
													addFriend(
														user.userId,
														setLoading,
														usersDetails,
														setUsersDetails
													)
												}
												className="relative h-10 w-40 rounded-md border hover:bg-gray-800 hover:text-white cursor-pointer text-xs flex items-center justify-center"
											>
												Accept request?
											</div>
										)}
										{userStatus === "requestSent" && (
											<div
												onClick={() =>
													removeFriend(
														user.userId,
														setLoading,
														usersDetails,
														setUsersDetails
													)
												}
												className="relative h-10 w-40 rounded-md border hover:bg-gray-800 hover:text-white cursor-pointer text-xs flex items-center justify-center"
											>
												Cancel request?
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
