import { SignInButton } from "@/components/signin-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await auth();
	if (session?.user?.id) {
		return redirect("/dashboard");
	}
	return (
		<div className="flex flex-col items-center gap-2 mt-4">
			<p className="text-lg text-center">
				Please sign in to use <strong>CloudDrive</strong>
			</p>
			<SignInButton />
		</div>
	);
}
