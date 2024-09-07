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

export const uploadFileFormSchema = z.object({
	fileName: z.string().min(2).max(50),
});

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/store";
import { uploadFile } from "@/app/dashboard/actions";
import { toast } from "sonner";
import { useState } from "react";

export default function UploadFileModal() {
	const [isPending, setPending] = useState(false);
	const { currentPath } = useStore();
	const [openModal, setModalOpen] = useState(false);
	const form = useForm<z.infer<typeof uploadFileFormSchema>>({
		resolver: zodResolver(uploadFileFormSchema),
		defaultValues: {
			fileName: "",
		},
	});

	async function onSubmit(values: z.infer<typeof uploadFileFormSchema>) {
		console.log(values);
		setPending(true);
		const result = await uploadFile({
			fileName: values.fileName,
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
				<Button variant="outline">Upload a file</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload file</DialogTitle>
					<DialogDescription>
						File will be uploaded in folder that you are currently.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="fileName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>File name</FormLabel>
									<FormControl>
										<Input placeholder="shadcn.pdf" {...field} />
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={isPending}>
							Upload
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
