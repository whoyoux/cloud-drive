import CreateFolderModal from "@/components/create-folder-modal";
import FilesBreadcrumb from "@/components/files-breadcrumb";
import FilesGrid from "@/components/files-grid";
import UploadFileModal from "@/components/upload-modal";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

export default async function DashboardPage() {
	const session = await auth();
	if (!session?.user?.id) return notFound();

	const items = await prisma.fileSystemItem.findMany({
		where: {
			userId: session.user.id,
		},
	});

	return (
		<div className="flex flex-col gap-4">
			<TopBar />
			<FilesBreadcrumb />
			<FilesGrid files={items} />
		</div>
	);
}

function TopBar() {
	return (
		<div className="w-full flex items-center gap-2">
			<UploadFileModal />
			<CreateFolderModal />
		</div>
	);
}
