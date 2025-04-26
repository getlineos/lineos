import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Info } from "lucide-react";

export default function Pricing() {
	return (
		<TabsContent value="pricing" className="space-y-6">
			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">Pricing Model</h2>

				<RadioGroup defaultValue="free" className="space-y-4">
					<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
						<RadioGroupItem value="free" id="free" className="mt-1" />
						<div>
							<Label htmlFor="free" className="text-base font-medium">
								Free
							</Label>
							<p className="text-sm text-gray-600">
								Your app will be available for free download
							</p>
						</div>
					</div>

					<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
						<RadioGroupItem value="paid" id="paid" className="mt-1" />
						<div className="flex-1">
							<Label htmlFor="paid" className="text-base font-medium">
								Paid
							</Label>
							<p className="text-sm text-gray-600 mb-3">
								Users pay once to download your app
							</p>

							<div className="flex items-center space-x-2">
								<Label htmlFor="price" className="text-sm font-medium">
									Price:
								</Label>
								<div className="relative rounded-md shadow-sm w-32">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<span className="text-gray-500 sm:text-sm">$</span>
									</div>
									<Input
										id="price"
										type="number"
										className="pl-7"
										placeholder="0.00"
									/>
								</div>
								<Select defaultValue="usd">
									<SelectTrigger className="w-24">
										<SelectValue placeholder="USD" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="usd">USD</SelectItem>
										<SelectItem value="eur">EUR</SelectItem>
										<SelectItem value="gbp">GBP</SelectItem>
										<SelectItem value="jpy">JPY</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
						<RadioGroupItem value="freemium" id="freemium" className="mt-1" />
						<div>
							<Label htmlFor="freemium" className="text-base font-medium">
								Freemium
							</Label>
							<p className="text-sm text-gray-600">
								Free to download with in-app purchases
							</p>
							<div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start">
								<Info className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
								<p>
									You'll need to configure in-app purchases separately after
									your app is approved.
								</p>
							</div>
						</div>
					</div>

					<div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
						<RadioGroupItem
							value="subscription"
							id="subscription"
							className="mt-1"
						/>
						<div>
							<Label htmlFor="subscription" className="text-base font-medium">
								Subscription
							</Label>
							<p className="text-sm text-gray-600">
								Users pay a recurring fee to use your app
							</p>
							<div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 flex items-start">
								<Info className="h-5 w-5 mr-2 flex-shrink-0 text-blue-500" />
								<p>
									You'll need to configure subscription plans separately after
									your app is approved.
								</p>
							</div>
						</div>
					</div>
				</RadioGroup>
			</div>

			<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
				<h2 className="text-lg font-semibold mb-4">Availability</h2>

				<div className="space-y-4">
					<div>
						<Label className="text-base font-medium mb-2 block">
							Release Type
						</Label>
						<RadioGroup defaultValue="immediate" className="space-y-3">
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="immediate" id="immediate" />
								<Label htmlFor="immediate">Release as soon as approved</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="manual" id="manual" />
								<Label htmlFor="manual">Manually release after approval</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="scheduled" id="scheduled" />
								<Label htmlFor="scheduled">Schedule release date</Label>
							</div>
						</RadioGroup>
					</div>

					<div className="pt-3">
						<Label className="text-base font-medium mb-2 block">
							Territories
						</Label>
						<div className="flex items-center justify-between p-3 border rounded-lg">
							<div>
								<p className="font-medium">All Territories</p>
								<p className="text-sm text-gray-600">
									Make your app available worldwide
								</p>
							</div>
							<Button variant="outline" size="sm">
								Customize
							</Button>
						</div>
					</div>

					<div className="pt-3">
						<div className="flex items-center justify-between mb-2">
							<Label className="text-base font-medium">Pre-Orders</Label>
							<Switch id="preorder" />
						</div>
						<p className="text-sm text-gray-600">
							Allow users to pre-order your app before its release date
						</p>
					</div>
				</div>
			</div>
		</TabsContent>
	);
}
