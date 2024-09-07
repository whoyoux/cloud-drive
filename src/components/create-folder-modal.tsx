"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const createFolderFormSchema = z.object({
	folderName: z.string().min(2).max(50),
});

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/store";
import { createNewFolder, uploadFile } from "@/app/dashboard/actions";
import { toast } from "sonner";
import { useState } from "react";

export default function CreateFolderModal() {
	const [isPending, setPending] = useState(false);
	const { currentPath } = useStore();
	const [openModal, setModalOpen] = useState(false);
	const form = useForm<z.infer<typeof createFolderFormSchema>>({
		resolver: zodResolver(createFolderFormSchema),
		defaultValues: {
			folderName: "",
		},
	});

	async function onSubmit(values: z.infer<typeof createFolderFormSchema>) {
		console.log(values);
		setPending(true);
		const result = await createNewFolder({
			folderName: values.folderName,
			path: currentPath,
		});
		setPending(false);

		if (result.success) {
			setModalOpen(false);
			toast.success(result.message);
		} else if (!result.success) {
			toast.error(result.message);
		}
	}
	return (
		<Dialog open={openModal} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Create folder</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create folder</DialogTitle>
					<DialogDescription>
						Folder will be created in current folder.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="folderName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Folder name</FormLabel>
									<FormControl>
										<Input placeholder="Photos" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={isPending}>
							Create
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
