import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";

export function SignInButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("discord", { redirectTo: "/dashboard" });
			}}
		>
			<Button type="submit">Sign in</Button>
		</form>
	);
}
