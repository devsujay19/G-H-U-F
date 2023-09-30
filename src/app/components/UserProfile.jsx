import { Avatar, Badge, Box, Button, Flex, Text, VStack } from "@/app/chakra";
import Repos from "./Repos";

const UserProfile = ({ userData }) => {
	return (
		<>
			<Flex my={16} border={"2px solid"} borderColor={"blue.400"} borderRadius={4} padding={8}>
				<VStack gap={8}>
					<Avatar size={"0xl"} name={userData.name} src={userData.avatar_url} />
					<Button colorScheme='twitter'>
						<a href={userData.html_url} target='_blank'>
							View Profile
						</a>
					</Button>
				</VStack>

				<VStack ml={8} alignItems={"self-start"}>
					<Flex gap={6}>
						<Badge fontSize={"0.9em"} colorScheme='blue'>
							Repositories : {userData.public_repos}
						</Badge>
						<Badge fontSize={"0.9em"} colorScheme='green'>
							Gists : {userData.public_gists}
						</Badge>
						<Badge fontSize={"0.9em"} colorScheme='yellow'>
							Followers : {userData.followers}
						</Badge>
						<Badge fontSize={"0.9em"} colorScheme='pink'>
							Following : {userData.following}
						</Badge>
					</Flex>

					<Text fontSize={"2xl"} fontWeight={"bold"} mt={4} color={"blue.200"}>
						{userData.name}
					</Text>
					<Text fontSize={"md"} fontWeight={"bold"} color={"white"}>
						{userData.bio}
					</Text>

					<Box>
						<Text fontSize={"md"}>
							<Text as={"span"} fontWeight={"bold"} color={"blue.200"} mr={1}>
								Associated company :
							</Text>
							{userData.company || "No company is associated with the user"}
						</Text>
						<Text fontSize={"md"}>
							<Text as={"span"} fontWeight={"bold"} color={"blue.200"} mr={1}>
								Location of the user :
							</Text>
							{userData.location || "No location was given by the user"}
						</Text>

						<Text fontSize={"md"}>
							<Text as={"span"} fontWeight={"bold"} color={"blue.200"} mr={1}>
								Redirecting website of user :
							</Text>
							{userData.blog ? (
								<a href={userData.blog} target='_blank'>
									{userData.blog}
								</a>
							) : (
								"No URL or web address was given by the user"
							)}
						</Text>

						<Text fontSize={"md"}>
							<Text as={"span"} fontWeight={"bold"} color={"blue.200"} mr={1}>
								GitHub user since :
							</Text>
							{new Date(userData.created_at).toLocaleDateString()}
						</Text>
					</Box>
				</VStack>
			</Flex>

			<Repos reposUrl={userData.repos_url} />
		</>
	);
};

export default UserProfile;
