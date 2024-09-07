import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { File, Folder } from "lucide-react";
import { useStore } from "@/store/store";
import type { FileSystemItem } from "@prisma/client";

export default function FileCard({ file }: { file: FileSystemItem }) {
	const { changePath } = useStore();
	switch (file.type) {
		case "FILE": {
			return (
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<div className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4">
							<File className="size-12" />
							<span className="font-medium truncate max-w-[90%]">
								{file.name}
							</span>
						</div>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>Download</ContextMenuItem>
						<ContextMenuItem>Share</ContextMenuItem>
						<ContextMenuItem className="text-destructive">
							Remove
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			);
		}
		case "FOLDER": {
			return (
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<button
							className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted"
							onClick={() => changePath(`${file.path}/${file.name}`)}
							type="button"
						>
							<Folder className="size-12" />
							<span className="font-medium truncate max-w-[90%]">
								{file.name}
							</span>
						</button>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>Go</ContextMenuItem>
						<ContextMenuItem>Change name</ContextMenuItem>
						<ContextMenuItem disabled>Change icon</ContextMenuItem>
						<ContextMenuItem className="text-destructive">
							Remove
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			);
		}
	}
}
