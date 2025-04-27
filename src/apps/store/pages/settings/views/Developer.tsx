import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonProps } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/store/hooks";
import { setDeveloperStatus } from "@/store/slices/appStore";
import { cn } from "@/utils";
import { AlertCircle, Github, Info } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import { initializeInstalledApps } from "@/config/apps";

export default function Developer() {
	const dispatch = useDispatch();
	const { isDeveloper } = useAppSelector(
		(state) => state.appStore.settings.developer
	);
	const { isAuthenticated } = useAuth();

	const handleDeveloperStatusChange = (status: boolean) => {
		dispatch(setDeveloperStatus(status));
	};

	return (
		<TabsContent value="developer" className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Developer Account</CardTitle>
					<CardDescription>
						Manage your developer account settings
					</CardDescription>
				</CardHeader>
				{isDeveloper ? (
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Developer Status</h3>
								<p className="text-sm text-gray-500">
									Your current developer program status
								</p>
							</div>
							<Badge>Active</Badge>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Developer ID</h3>
								<p className="text-sm text-gray-500">
									Your unique developer identifier
								</p>
							</div>
							<div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
								DEV123456789
							</div>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div>
								<h3 className="font-medium">Team</h3>
								<p className="text-sm text-gray-500">Your development team</p>
							</div>
							<Button variant="outline">Manage Team</Button>
						</div>
					</CardContent>
				) : isAuthenticated ? (
					<div className="flex items-center justify-center h-40">
						<Button
							variant="outline"
							onClick={() => handleDeveloperStatusChange(true)}
							className="bg-snow"
						>
							Join Developer Program
						</Button>
					</div>
				) : (
					<div className="mb-6 mx-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-start">
								<Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
								<div>
									<h3 className="text-sm font-medium text-blue-800">
										Authentication Required
									</h3>
									<p className="mt-1 text-sm text-blue-700">
										You need to be logged in to apply for a developer account.
										Please sign in or create an account to continue.
									</p>
								</div>
							</div>
							<LoginButton variant="default" className="shrink-0" />
						</div>
					</div>
				)}
			</Card>

			{isDeveloper ? (
				<>
					<Card>
						<CardHeader>
							<CardTitle>App Development</CardTitle>
							<CardDescription>Settings for app development</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">TestFlight Settings</h3>
									<p className="text-sm text-gray-500">
										Manage beta testing for your apps
									</p>
								</div>
								<Button variant="outline">Configure</Button>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">API Keys</h3>
									<p className="text-sm text-gray-500">
										Manage API keys for App Store Connect
									</p>
								</div>
								<Button variant="outline">Manage Keys</Button>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">Certificates</h3>
									<p className="text-sm text-gray-500">
										Manage development and distribution certificates
									</p>
								</div>
								<Button variant="outline">Manage Certificates</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Analytics & Reports</CardTitle>
							<CardDescription>
								Configure developer analytics settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">Sales Reports</h3>
									<p className="text-sm text-gray-500">
										Configure sales report delivery
									</p>
								</div>
								<Select defaultValue="weekly">
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Report frequency" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="daily">Daily</SelectItem>
										<SelectItem value="weekly">Weekly</SelectItem>
										<SelectItem value="monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Separator />

							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium">App Analytics</h3>
									<p className="text-sm text-gray-500">
										Configure app usage analytics
									</p>
								</div>
								<Button
									variant="outline"
									onClick={() => initializeInstalledApps(true)}
								>
									Configure
								</Button>
							</div>
						</CardContent>
					</Card>
				</>
			) : null}
		</TabsContent>
	);
}

interface LoginButtonProps extends ButtonProps {
	variant?: "default" | "outline" | "ghost";
}

export function LoginButton({
	variant = "outline",
	className,
	...props
}: LoginButtonProps) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			const form = e.target as HTMLFormElement;
			const email = (form.elements.namedItem("email") as HTMLInputElement)
				.value;
			const password = (form.elements.namedItem("password") as HTMLInputElement)
				.value;

			await authService.signIn(email, password);
			setOpen(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		try {
			const form = e.target as HTMLFormElement;
			const email = (
				form.elements.namedItem("signup-email") as HTMLInputElement
			).value;
			const password = (
				form.elements.namedItem("signup-password") as HTMLInputElement
			).value;
			const confirmPassword = (
				form.elements.namedItem("confirm-password") as HTMLInputElement
			).value;

			if (password !== confirmPassword) {
				throw new Error("Passwords do not match");
			}

			await authService.signUp(email, password);
			setOpen(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSocialLogin = async (provider: "google" | "github" | "apple") => {
		setError(null);
		setIsLoading(true);

		try {
			await authService.signInWithProvider(provider);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant={variant}
						className={cn("bg-snow", className)}
						{...props}
					>
						Sign In
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Sign In or Create Account</DialogTitle>
						<DialogDescription>
							Sign in to your account or create a new one to apply for a
							developer account.
						</DialogDescription>
					</DialogHeader>

					<Tabs defaultValue="signin" className="w-full">
						<TabsList className="grid w-full grid-cols-2 bg-gray-100">
							<TabsTrigger value="signin">Sign In</TabsTrigger>
							<TabsTrigger value="signup">Create Account</TabsTrigger>
						</TabsList>

						<TabsContent value="signin" className="space-y-4 py-4">
							{error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<form onSubmit={handleLogin} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="name@example.com"
										required
									/>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="password">Password</Label>
										<Button
											variant="link"
											size="sm"
											className="h-auto p-0 text-xs"
										>
											Forgot password?
										</Button>
									</div>
									<Input id="password" type="password" required />
								</div>
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Signing in..." : "Sign In"}
								</Button>
							</form>

							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-snow px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-3">
								<Button
									variant="outline"
									type="button"
									disabled={isLoading}
									onClick={() => handleSocialLogin("apple")}
								>
									<svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M16.125 0H7.875C3.527 0 0 3.527 0 7.875v8.25C0 20.473 3.527 24 7.875 24h8.25C20.473 24 24 20.473 24 16.125v-8.25C24 3.527 20.473 0 16.125 0zm-2.29 19.562c-.405.975-1.125 1.785-2.1 2.355-.555.33-1.23.555-1.935.615-.12.015-.24.015-.36.015-.615 0-1.215-.135-1.755-.39-.645-.285-1.2-.75-1.56-1.29-.195-.3-.345-.615-.42-.96-.09-.48-.045-1.005.09-1.47.195-.615.555-1.17 1.02-1.575.45-.42 1.005-.735 1.59-.87.3-.075.615-.105.93-.105.195 0 .39.015.585.045.615.09 1.2.33 1.695.69.495.345.9.81 1.17 1.35.3.57.435 1.2.39 1.83-.03.255-.09.51-.18.75h.015c-.045.015-.06.015-.075.015zm4.845-10.71c-.93.99-2.295 1.5-3.675 1.305-1.53-.195-2.88-1.17-3.57-2.565-.18-.36-.3-.75-.36-1.14-.045-.42-.015-.84.09-1.245.12-.435.33-.84.615-1.185.285-.345.645-.63 1.05-.825.42-.21.885-.33 1.35-.345.18-.015.36 0 .54.03.495.06.975.225 1.395.465.42.24.78.57 1.065.96.285.39.495.84.6 1.305.105.465.105.945.015 1.41-.09.435-.255.855-.51 1.215-.165.21-.345.405-.54.585l-.015.03z"
										/>
									</svg>
									Apple
								</Button>
								<Button
									variant="outline"
									type="button"
									disabled={isLoading}
									onClick={() => handleSocialLogin("google")}
								>
									<svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										/>
										<path
											fill="currentColor"
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										/>
										<path
											fill="currentColor"
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										/>
										<path
											fill="currentColor"
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										/>
									</svg>
									Google
								</Button>
								<Button
									variant="outline"
									type="button"
									disabled={isLoading}
									onClick={() => handleSocialLogin("github")}
								>
									<Github className="h-4 w-4 mr-2" />
									GitHub
								</Button>
							</div>
						</TabsContent>

						<TabsContent value="signup" className="space-y-4 py-4">
							{error && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<form onSubmit={handleSignUp} className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="first-name">First Name</Label>
										<Input id="first-name" required />
									</div>
									<div className="space-y-2">
										<Label htmlFor="last-name">Last Name</Label>
										<Input id="last-name" required />
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signup-email">Email</Label>
									<Input
										id="signup-email"
										type="email"
										placeholder="name@example.com"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="signup-password">Password</Label>
									<Input id="signup-password" type="password" required />
								</div>
								<div className="space-y-2">
									<Label htmlFor="confirm-password">Confirm Password</Label>
									<Input id="confirm-password" type="password" required />
								</div>
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Creating account..." : "Create Account"}
								</Button>
							</form>

							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-snow px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-3">
								<Button
									variant="outline"
									type="button"
									disabled={isLoading}
									onClick={() => handleSocialLogin("apple")}
								>
									<svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M16.125 0H7.875C3.527 0 0 3.527 0 7.875v8.25C0 20.473 3.527 24 7.875 24h8.25C20.473 24 24 20.473 24 16.125v-8.25C24 3.527 20.473 0 16.125 0zm-2.29 19.562c-.405.975-1.125 1.785-2.1 2.355-.555.33-1.23.555-1.935.615-.12.015-.24.015-.36.015-.615 0-1.215-.135-1.755-.39-.645-.285-1.2-.75-1.56-1.29-.195-.3-.345-.615-.42-.96-.09-.48-.045-1.005.09-1.47.195-.615.555-1.17 1.02-1.575.45-.42 1.005-.735 1.59-.87.3-.075.615-.105.93-.105.195 0 .39.015.585.045.615.09 1.2.33 1.695.69.495.345.9.81 1.17 1.35.3.57.435 1.2.39 1.83-.03.255-.09.51-.18.75h.015c-.045.015-.06.015-.075.015zm4.845-10.71c-.93.99-2.295 1.5-3.675 1.305-1.53-.195-2.88-1.17-3.57-2.565-.18-.36-.3-.75-.36-1.14-.045-.42-.015-.84.09-1.245.12-.435.33-.84.615-1.185.285-.345.645-.63 1.05-.825.42-.21.885-.33 1.35-.345.18-.015.36 0 .54.03.495.06.975.225 1.395.465.42.24.78.57 1.065.96.285.39.495.84.6 1.305.105.465.105.945.015 1.41-.09.435-.255.855-.51 1.215-.165.21-.345.405-.54.585l-.015.03z"
										/>
									</svg>
									Apple
								</Button>
								<Button
									variant="outline"
									type="button"
									disabled={isLoading}
									onClick={() => handleSocialLogin("google")}
								>
									<svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										/>
										<path
											fill="currentColor"
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										/>
										<path
											fill="currentColor"
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										/>
										<path
											fill="currentColor"
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										/>
									</svg>
									Google
								</Button>
								<Button
									variant="outline"
									type="button"
									disabled={isLoading}
									onClick={() => handleSocialLogin("github")}
								>
									<Github className="h-4 w-4 mr-2" />
									GitHub
								</Button>
							</div>
						</TabsContent>
					</Tabs>

					<DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0 pt-2">
						<p className="text-xs text-gray-500">
							By continuing, you agree to our{" "}
							<a href="#" className="underline hover:text-blue-600">
								Terms of Service
							</a>{" "}
							and{" "}
							<a href="#" className="underline hover:text-blue-600">
								Privacy Policy
							</a>
							.
						</p>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
