"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FILE_SYSTEM_ITEM_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UploadFileActionSchema = z.object({
	fileName: z.string().min(2).max(50),
	path: z.string(),
});

type UploadFileActionType = z.infer<typeof UploadFileActionSchema>;

type UploadFileActionResult = {
	success: boolean;
	message: string;
};

export async function uploadFile(
	props: UploadFileActionType,
): Promise<UploadFileActionResult> {
	const parsedProps = await UploadFileActionSchema.safeParseAsync(props);
	if (!parsedProps.success) {
		return {
			success: false,
			message: "Wrong params!",
		};
	}

	const session = await auth();

	if (!session?.user?.id) {
		return {
			success: false,
			message: "You have to sign in!",
		};
	}

	const existingFile = await prisma.fileSystemItem.findFirst({
		where: {
			userId: session.user.id,
			name: parsedProps.data.fileName,
			path: parsedProps.data.path,
		},
	});

	if (existingFile) {
		return {
			success: false,
			message: "Object already exist!",
		};
	}

	const result = await prisma.fileSystemItem.create({
		data: {
			name: parsedProps.data.fileName,
			type: "FILE",
			path: parsedProps.data.path,
			user: {
				connect: {
					id: session.user.id,
				},
			},
		},
	});

	revalidatePath("/dashboard");

	console.log(result);

	return {
		success: true,
		message: "Added new file!",
	};
}

const CreateNewFolderActionSchema = z.object({
	folderName: z.string().min(2).max(50),
	path: z.string(),
});

type CreateNewFolderActionType = z.infer<typeof CreateNewFolderActionSchema>;

type CreateNewFolderActionResult = {
	success: boolean;
	message: string;
};

export const createNewFolder = async (
	props: CreateNewFolderActionType,
): Promise<CreateNewFolderActionResult> => {
	const parsedProps = await CreateNewFolderActionSchema.safeParseAsync(props);
	if (!parsedProps.success) {
		return {
			success: false,
			message: "Wrong params!",
		};
	}

	const session = await auth();

	if (!session?.user?.id) {
		return {
			success: false,
			message: "You have to sign in!",
		};
	}

	const existingFolder = await prisma.fileSystemItem.findFirst({
		where: {
			userId: session.user.id,
			name: parsedProps.data.folderName,
			path: parsedProps.data.path,
		},
	});

	if (existingFolder) {
		return {
			success: false,
			message: "Object already exist!",
		};
	}

	const result = await prisma.fileSystemItem.create({
		data: {
			name: parsedProps.data.folderName,
			type: "FOLDER",
			path: parsedProps.data.path,
			user: {
				connect: {
					id: session.user.id,
				},
			},
		},
	});

	revalidatePath("/dashboard");

	console.log(result);

	return {
		success: true,
		message: "Added new folder!",
	};
};
