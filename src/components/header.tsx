import { auth } from "@/lib/auth";
import { ThemeDropdown } from "./theme-dropdown";
import { SignInButton } from "./signin-button";
import { SignOutButton } from "./signout-button";

export async function Header() {
	const session = await auth();
	return (
		<header className="flex items-center justify-between py-4 border-b mb-4 max-w-screen-lg w-full">
			<h1 className="text-lg font-semibold">clouddrive</h1>
			<div className="flex gap-4 items-center">
				{session?.user?.id ? <SignOutButton /> : <SignInButton />}
				<ThemeDropdown />
			</div>
		</header>
	);
}
