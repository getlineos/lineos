import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, ExternalLink, MoreHorizontal, Settings } from "lucide-react";

export default function AppCard({ app }: { app: any }) {
	return (
		<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
			<div className="p-4 flex gap-4">
				<div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
					<img
						src={app.icon || "/placeholder.svg"}
						alt={app.name}
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-medium text-lg truncate">{app.name}</h3>
							<p className="text-sm text-gray-500">{app.developer}</p>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<MoreHorizontal className="h-4 w-4" />
									<span className="sr-only">More options</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{app.type === "purchased" ? (
									<>
										<DropdownMenuItem>Open</DropdownMenuItem>
										<DropdownMenuItem>Update</DropdownMenuItem>
										<DropdownMenuItem>Share</DropdownMenuItem>
										<DropdownMenuItem>Information</DropdownMenuItem>
										<DropdownMenuItem className="text-red-600">
											Delete
										</DropdownMenuItem>
									</>
								) : (
									<>
										<DropdownMenuItem>Edit Listing</DropdownMenuItem>
										<DropdownMenuItem>View Analytics</DropdownMenuItem>
										<DropdownMenuItem>Manage Version</DropdownMenuItem>
										<DropdownMenuItem>View on App Store</DropdownMenuItem>
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<div className="flex items-center gap-2 mt-1">
						<Badge variant="outline" className="text-xs font-normal">
							{app.category}
						</Badge>
						<span className="text-xs text-gray-500">v{app.version}</span>
					</div>
				</div>
			</div>

			<div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="text-xs text-gray-500">
						{app.type === "developed" && app.status === "published" ? (
							<div className="flex gap-3">
								<span>{app.downloads} downloads</span>
								<span>{app.rating} ★</span>
							</div>
						) : (
							<span>{app.size}</span>
						)}
					</div>
					<div className="text-xs text-gray-500">
						{app.status === "in-review" ? (
							<span className="text-amber-600 font-medium">In Review</span>
						) : (
							<span>Updated {app.lastUpdated}</span>
						)}
					</div>
				</div>

				<div className="flex gap-1">
					{app.type === "purchased" && (
						<>
							{app.status === "update-available" ? (
								<Button size="sm" className="h-8">
									<Download className="h-3.5 w-3.5 mr-1" /> Update
								</Button>
							) : (
								<Button size="sm" variant="outline" className="h-8">
									<ExternalLink className="h-3.5 w-3.5 mr-1" /> Open
								</Button>
							)}
						</>
					)}

					{app.type === "developed" && (
						<Button size="sm" variant="outline" className="h-8">
							<Settings className="h-3.5 w-3.5 mr-1" /> Manage
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
