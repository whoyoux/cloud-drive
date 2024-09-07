import { Skeleton } from "@/components/ui/skeleton";
import { TopBar } from "./page";

export default function LoadingDashboard() {
	return (
		<div className="flex flex-col gap-4">
			<TopBar />
			<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
				<Skeleton className="w-full border rounded-lg aspect-square flex flex-col items-center justify-center gap-4" />
			</div>
		</div>
	);
}
