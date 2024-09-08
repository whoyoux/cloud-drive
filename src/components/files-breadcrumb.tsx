"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useStore } from "@/store/store";
import { useMemo } from "react";

const getSteps = (path: string) => {
	if (path === "") return [];
	const steps = path.split("/").filter((step) => step !== "");
	return steps;
};

const getPathToStep = (steps: string[], finalStep: string) => {
	const index = steps.indexOf(finalStep);
	if (index === -1) return "/";
	return `/${steps.slice(0, index + 1).join("/")}`;
};

export default function FilesBreadcrumb() {
	const { currentPath, changePath } = useStore();
	// const steps = getSteps(currentPath);
	const steps = useMemo(() => getSteps(currentPath), [currentPath]);
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem
					className="hover:cursor-pointer hover:text-primary"
					onClick={() => changePath("")}
				>
					Home
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{steps.map((step, idx) => {
					if (step === steps[steps.length - 1]) {
						return <BreadcrumbPage key={step}>{step}</BreadcrumbPage>;
					}
					return (
						<>
							<BreadcrumbItem
								key={step}
								className="hover:cursor-pointer hover:text-primary"
								onClick={() => changePath(getPathToStep(steps, step))}
							>
								{step}
							</BreadcrumbItem>
							<BreadcrumbSeparator
								key={`separator-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									idx
								}`}
							/>
						</>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
