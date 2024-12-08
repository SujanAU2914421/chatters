"use client";

import { firestore } from "@/app/components/firebase/firebase-config";
import {
	doc,
	getDocs,
	query,
	where,
	collection,
	addDoc,
} from "firebase/firestore"; // Firestore addDoc
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { checkIfLoggedIn } from "@/app/components/user/checkIfLoggedIn";
import { setUserOnlineStatus } from "@/app/components/chats/usersStatus";

const storeUserInFirestore = async (username, email, password) => {
	// Check if the username or email already exists
	const usernameQuery = query(
		collection(firestore, "users"),
		where("username", "==", username)
	);
	const usernameSnapshot = await getDocs(usernameQuery);

	const emailQuery = query(
		collection(firestore, "users"),
		where("email", "==", email)
	);
	const emailSnapshot = await getDocs(emailQuery);

	// Return null if either username or email exists
	if (!usernameSnapshot.empty) {
		console.log("Username already exists.");
		return null;
	}

	if (!emailSnapshot.empty) {
		console.log("Email already exists.");
		return null;
	}

	// Hash the password
	const hashedPassword = bcrypt.hashSync(password, 10);

	try {
		// Add user to Firestore and return the user ID
		const docRef = await addDoc(collection(firestore, "users"), {
			username: username,
			email: email,
			password: hashedPassword,
		});

		// Successfully created the user, now store user ID in localStorage
		localStorage.setItem("userId", docRef.id); // Store user ID in localStorage
		console.log("User created successfully! User ID:", docRef.id);
		setUserOnlineStatus(docRef.id, true);

		return docRef.id; // Return the user ID
	} catch (error) {
		console.error("Error creating user:", error);
		return null; // Return null if an error occurs
	}
};

// Signup handler
const signup = async (username, email, password) => {
	const userId = await storeUserInFirestore(username, email, password);
	if (userId) {
		console.log("Signup successful! User ID:", userId);
		window.location.pathname = "/chats";
	} else {
		console.log("Signup failed. Username or email already exists.");
	}
};

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	const submitHandler = () => {
		signup(username, email, password);
	};

	useEffect(() => {
		checkIfLoggedIn();
	}, []);

	return (
		<div className="relative h-screen w-screen overflow-hidden font-mono">
			<div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-gradient-to-r from-gray-50 to-white">
				<div className="relative h-screen w-screen">
					<div className="relative h-full w-full flex">
						<div
							className="relative h-full w-1/2 flex items-center px-16"
							style={{
								background: "url(/assets/images/loginpageimg.jpg)",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						></div>
						<div className="relative h-full w-1/2 flex items-center px-32">
							<div className="relative h-auto w-full">
								<div className="relative text-xs text-gray-600 w-full">
									<div className="relative">
										Step in, Chief—log in to unlock the chat vibes! 🚀✨
									</div>
								</div>
								<div className="relative h-auto w-auto text-xs pt-16">
									Fill your Info
								</div>
								<div className="relative h-auto w-full pt-8">
									<div className="relative h-10 w-full border-b">
										<input
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											type="email"
											className="outline-none h-full w-full bg-transparent border-none text-xs"
											placeholder="email"
										/>
									</div>
								</div>
								<div className="relative h-auto w-full pt-6">
									<div className="relative h-10 w-full border-b">
										<input
											onChange={(e) => {
												setUsername(e.target.value);
											}}
											type="text"
											className="outline-none h-full w-full bg-transparent border-none text-xs"
											placeholder="Set username"
										/>
									</div>
								</div>
								<div className="relative h-auto w-full pt-6">
									<div className="relative h-10 w-full border-b flex">
										<input
											onChange={(e) => {
												setPassword(e.target.value);
											}}
											type={showPassword ? "text" : "password"}
											className="outline-none h-full w-full bg-transparent border-none text-xs"
											placeholder="password"
										/>
										<div
											onClick={() => {
												setShowPassword(!showPassword);
											}}
											className="relative h-full w-10 cursor-pointer flex items-center justify-center"
										>
											{showPassword ? (
												<svg
													width="17"
													height="17"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
													<circle cx="12" cy="12" r="3"></circle>
												</svg>
											) : (
												<svg
													width="17"
													height="17"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
													<line x1="1" y1="1" x2="23" y2="23"></line>
												</svg>
											)}
										</div>
									</div>
								</div>
								<div className="relative h-auto w-auto pt-8">
									<div
										onClick={() => {
											password != "" && email != "" && username != ""
												? submitHandler()
												: "";
										}}
										className={`relative h-10 w-40 text-xs cursor-pointer shadow-md shadow-gray-40 ${
											password != "" && email != "" && username != ""
												? "bg-gray-800"
												: "bg-gray-600"
										} text-white flex items-center justify-center select-none`}
									>
										Sign Up
									</div>
								</div>

								<div className="relative flex pt-4">
									<div className="relative h-auto w-auto text-xs cursor-pointer text-gray-600">
										<div className="relative flex items-center pt-2 gap-3">
											Already have an account?
											<div
												onClick={() => {
													window.location.pathname = "/login";
												}}
												className="relative hover:text-gray-800 text-gray-600 font-bold underline"
											>
												Login{" "}
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
