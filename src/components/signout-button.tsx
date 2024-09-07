import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export function SignOutButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut({ redirectTo: "/" });
			}}
		>
			<Button type="submit">Sign out</Button>
		</form>
	);
}
