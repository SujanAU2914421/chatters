"use client";
import SideBar from "@/app/components/side-bar";
import React, { useEffect, useId, useState } from "react";
import { getUserIdFromLocalStorage } from "@/app/components/user/handleLocalStorage";
import { handleLogout } from "@/app/components/user/signOut";
import { removeFriend } from "./removeFriend";
import { getUserDetails } from "./getUserDetails";
import { editUserBio } from "./editBio";
import { fetchFriendsDetails } from "@/app/components/user/getAllFriends";

removeFriend;

export default function OthersProfile({ user_id }) {
	const [editingBio, setEditingBio] = useState(false);
	const [userBio, setUserBio] = useState(null);
	const [userId, setUserId] = useState(null);
	const [userDetail, setUserDetail] = useState([]);
	const [allFriends, setAllFriends] = useState([]);
	const [tempBio, setTempBio] = useState(null);
	const [loggingOut, setLoggingOut] = useState(false);
	const [loading, setLoading] = useState(true);
	const [waitMessage, setWaitMessage] = useState(null);
	useEffect(() => {
		const getFriends = async () => {
			if (userId) {
				try {
					const friendsData = await fetchFriendsDetails(userId);
					setAllFriends(friendsData); // Store the friends data in the state
				} catch (error) {
					console.error("Error fetching friends details:", error);
				}
			}
		};

		getFriends(); // Call the async function

		const getUser = async () => {
			if (userId) {
				try {
					setLoading(true);
					setWaitMessage("Loading Profile...");
					const userData = await getUserDetails(userId); // Fetch user details
					setLoading(false);
					setWaitMessage("");
					setUserDetail(userData); // Store user details in state
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			}
		};

		getUser(); // Call the async function
	}, [userId]);

	useEffect(() => {
		if (userDetail) {
			setUserBio(userDetail.bio);
		}
	}, [userDetail]);

	const handleRemoveFriend = async (userId, friendId) => {
		try {
			setLoading(true);
			setWaitMessage("Removing please wait...");
			const updatedFriendsList = await removeFriend(userId, friendId);
			console.log("Updated friends list:", updatedFriendsList);
			// Optionally, update the state to reflect the change in the UI

			setLoading(false);
			setWaitMessage(null);
			setAllFriends(updatedFriendsList); // Assuming `setFriends` is your state update function
		} catch (error) {
			console.error("Error removing friend:", error);
		}
	};

	useEffect(() => {
		const userId = getUserIdFromLocalStorage();
		if (!userId) {
			window.location.pathname = "/login";
			// Proceed with user-specific actions
		}

		const url = new URL(window.location.href); // Or use a specific URL
		// Get query parameters using URLSearchParams
		const params = new URLSearchParams(url.search);

		setUserId(
			params.get("uid") || params.get("userid") || params.get("user_id")
		);
	}, []);

	return (
		<div className="relative h-screen w-screen overflow-hidden font-sans">
			<div className="relative h-full w-full">
				<div className="fixed z-40 h-full w-16 bg-gray-800 shadow-md shadow-gray-700">
					<SideBar />
				</div>
				{loading && (
					<div className="fixed z-50 bg-white/10 h-full w-full flex items-center justify-center">
						<div className="relative">{waitMessage}</div>
					</div>
				)}
				<div className="relative flex w-full h-full justify-center">
					<div className="relative h-full w-auto">
						<div className="relative h-full w-[40rem] overflow-y-auto border-l border-r pt-8 pb-8 px-8">
							<div className="relative h-auto w-full">
								<div className="relative flex items-center justify-between">
									<div
										onClick={() => {
											window.location.pathname = "/chats";
										}}
										className="relative h-auto flex items-center gap-3 text-gray-700 cursor-pointer group"
									>
										<div className="relative flex items-center justify-center group-hover:-translate-x-1 duration-200">
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<line x1="19" y1="12" x2="5" y2="12"></line>
												<polyline points="12 19 5 12 12 5"></polyline>
											</svg>
										</div>
										<div className="relative text-sm font-bold">Back</div>
									</div>
								</div>
								<div className="relative h-auto w-full pt-8">
									<div className="relative">
										<div className="relative text-4xl font-extrabold text-gray-600 font-mono">
											{userDetail.username}
										</div>
										<div className="relative w-full pt-8">
											{
												<div className="relative text-xs w-3/4 leading-5 font-bold text-gray-600 font-mono">
													{userBio && userBio.length > 0 ? userBio : ""}
												</div>
											}
										</div>

										<div className="relative pt-8 w-full">
											<div className="relative flex items-center justify-between">
												<div className="relative flex items-center gap-2">
													<div className="relative text-xs font-bold text-gray-600">
														Friends
													</div>

													<div className="relative h-auto w-auto flex items-center gap-2">
														<div className="relative flex items-center gap-1 text-gray-600">
															<div className="relative text-xs font-semibold">
																a - z
															</div>
															<div className="relative h-auto w-auto flex items-center justify-center">
																<svg
																	width="18"
																	height="18"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																>
																	<polyline points="6 9 12 15 18 9"></polyline>
																</svg>
															</div>
														</div>
													</div>
												</div>
												<div className="relative">
													<div className="relative flex items-center gap-4">
														<div className="relative h-8 w-40 rounded border flex items-center justify-center">
															<input
																type="text"
																placeholder="Search friend?"
																className="relative h-full w-full px-4 bg-transparent text-xs outline-none border-none"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="relative h-auto w-full pt-4 grid gap-3">
												{allFriends
													? allFriends.map((friend, index) => {
															return (
																<div
																	onClick={() => {
																		const params = new URLSearchParams({
																			user_id: friend.userId,
																		});
																		const url = "/profile?" + params.toString();
																		window.location = url;
																	}}
																	key={index}
																	className="relative w-96 flex justify-between py-4 px-4 group cursor-pointer border border-gray-200 hover:border-gray-500 rounded-md"
																>
																	<div className="relative grid gap-1">
																		<div className="relative h-auto text-sm font-bold text-gray-700">
																			{friend.username}
																		</div>
																		<div className="relative h-auto text-xs text-gray-500">
																			No mutual friends
																		</div>
																	</div>
																</div>
															);
													  })
													: ""}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
