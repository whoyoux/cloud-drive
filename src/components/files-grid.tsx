"use client";

import FileCard from "./file-card";
import { useStore } from "@/store/store";
import type { FileSystemItem } from "@prisma/client";

export default function FilesGrid({ files }: { files: FileSystemItem[] }) {
	const { currentPath } = useStore();
	return (
		<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
			{files
				.filter((file) => file.path === currentPath)
				.map((result) => (
					<FileCard file={result} key={result.id} />
				))}
		</div>
	);
}
