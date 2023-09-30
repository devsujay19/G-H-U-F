"use client";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
	Avatar, Box, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const HistoryModal = ({ isOpen, onClose }) => {
	const [searchHistory, setSearchHistory] = useState([]);
	const toast = useToast();

	useEffect(() => {
		const users = JSON.parse(localStorage.getItem("github-users")) || [];
		setSearchHistory(users);
	}, []);

	const handleDeleteUser = (userId) => {
		const users = JSON.parse(localStorage.getItem("github-users")) || [];
		const userToDelete = users.find((user) => user.id === userId);
		if (userToDelete) users.splice(users.indexOf(userToDelete), 1);

		localStorage.setItem("github-users", JSON.stringify(users));
		setSearchHistory(users);
		toast({
			title: "ACTIVITY SUCCESSFULLY DONE",
			description: "The GitHub user you want to remove from your search history has been removed successfully!",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg={"gray.900"}>
				<ModalHeader> Your Search History</ModalHeader>
				<ModalBody>
					<Text>The GitHub Users you searched for :</Text>
					<VStack gap={4} maxHeight={300} overflowY={"auto"} my={4}>
						{searchHistory.length === 0 && (
							<Text color={"gray.400"} fontSize={"sm"} fontWeight={"bold"}>
								You didn't searched any of the users from GitHub platform.
							</Text>
						)}

						{searchHistory.map((user) => (
							<Flex
								key={user.id}
								alignItems={"center"}
								bg={"whiteAlpha.200"}
								w={"full"}
								_hover={{ bg: "whiteAlpha.400" }}
								borderRadius={4}
								p={2}
								cursor={"pointer"}
								justifyContent={"space-between"}
							>
								<Flex gap={2} alignItems={"center"}>
									<Avatar display={"block"} size={"lg"} name={user.name} src={user.avatar_url} />
									<Box>
										<Text fontWeight={"bold"}> {user.name || "User"} </Text>
										<Text fontSize={"sm"} color={"gray.400"}>
											{" "}
											{user.id}{" "}
										</Text>
									</Box>
								</Flex>

								<Flex alignItems={"center"} gap={4}>
									<Link
										href={user.url}
										size={"sm"}
										color='black'
										bg='twitter.400'
										px={2}
										borderRadius={4}
										_hover={{ textDecoration: "none", bg: "twitter.400" }}
									>
										Visit Profile
									</Link>
									<DeleteIcon color='red.400' onClick={() => handleDeleteUser(user.id)} />
								</Flex>
							</Flex>
						))}
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default HistoryModal;
