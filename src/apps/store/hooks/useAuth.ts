import { authService } from "@/apps/store/services/authService";
import { AppDispatch } from "@/store/persistence";
import { setLoading, setSession, setUser } from "@/store/slices/auth";
import { Session } from "@/types/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useAuth() {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		let isMounted = true;

		authService
			.getSession()
			.catch(() => null)
			.then((session) => {
				if (!isMounted) {
					return;
				}

				const authSession = session as Session | null;
				setAuthSession(authSession);
				setIsLoading(false);
				dispatch(setSession(authSession));
				dispatch(setUser(authSession?.user ?? null));
				dispatch(setLoading(false));
			});

		return () => {
			isMounted = false;
		};
	}, [dispatch]);

	return {
		session: authSession,
		isLoading,
		isAuthenticated: !!authSession,
		user: authSession?.user,
	};
}
