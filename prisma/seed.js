const { PrismaClient } = require("@prisma/client");

const USER_ID = "cm0sauozr0000vorbrckpz5fb";

const prisma = new PrismaClient();

const main = async () => {
	try {
		const result = await prisma.fileSystemItem.createMany({
			data: [
				{
					path: "",
					type: "FILE",
					name: "example.png",
					key: "/wdwdwd/example.png",
					userId: USER_ID,
				},
				{
					path: "",
					type: "FOLDER",
					name: "My folder 1",
					userId: USER_ID,
				},
				{
					path: "",
					type: "FILE",
					name: "doesntmatter.txt",
					key: "/wdwdwd/example.png",
					userId: USER_ID,
				},
				{
					path: "",
					type: "FILE",
					name: "cv.pdf",
					key: "/wdwdwd/example.png",
					userId: USER_ID,
				},
				{
					path: "",
					type: "FOLDER",
					name: "Photos",
					userId: USER_ID,
				},
				{
					path: "/photos",
					type: "FILE",
					name: "zdjecie1.png",
					key: "/wdwdwd/example.png",
					userId: USER_ID,
				},
				{
					path: "/my folder 1",
					type: "FOLDER",
					name: "Images",
					userId: USER_ID,
				},
				{
					path: "/my folder 1/images",
					type: "FOLDER",
					name: "Secrets",
					userId: USER_ID,
				},
				{
					path: "/my folder 1/images/secrets",
					type: "FILE",
					key: "asfdawda",
					name: ".env",
					userId: USER_ID,
				},
			],
		});
		console.log(result);
	} catch (err) {
		console.error(err);
	}
};

main();
