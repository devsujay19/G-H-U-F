"use client";
import { Button, Input, useToast } from "@/app/chakra";
import { useState } from "react";

const Search = ({ setUserData, setLoading }) => {
	const [query, setQuery] = useState("");
	const toast = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!query) return;
		setLoading(true);
		setUserData(null);
		try {
			const res = await fetch(`https://api.github.com/users/${query}`);
			const data = await res.json();

			if (data.message) {
				return toast({
					title: "AN UNKNOWN USERNAME IS ENTERED",
					description: data.message === "Not Found" ? "Unfortunately, the user you are looking for does not exists in the servers and databases of GitHub." : data.message,
					status: "error",
					duration: 20000,
					isClosable: true,
				});
			}
			setUserData(data);
			addUserToLocalStorage(data, query);
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	const addUserToLocalStorage = (data, username) => {
		const users = JSON.parse(localStorage.getItem("github-users")) || [];
		const userExists = users.find((user) => user.id === username);

		if (userExists) {
			users.splice(users.indexOf(userExists), 1);
		}
		users.unshift({
			id: username,
			avatar_url: data.avatar_url,
			name: data.name,
			url: data.html_url,
		});

		localStorage.setItem("github-users", JSON.stringify(users));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				variant={"outline"}
				placeholder={"Type a username of a GitHub user (e.g, ''devsujay19'')"}
				focusBorderColor='blue.400'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button size='md' type='submit' colorScheme='twitter' mt={4} disabled={!query} opacity={!query ? 0.5 : 1}>
				Search User
			</Button>
		</form>
	);
};

export default Search;
