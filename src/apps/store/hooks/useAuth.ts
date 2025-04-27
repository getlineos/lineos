import { supabase } from "@/lib/supabase";
import { AppDispatch } from "@/store/persistence";
import { setLoading, setSession, setUser } from "@/store/slices/auth";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useAuth() {
	const [authSession, setAuthSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setAuthSession(session);
			setIsLoading(false);
			dispatch(setSession(session));
			dispatch(setUser(session?.user ?? null));
			dispatch(setLoading(false));
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setAuthSession(session);
			setIsLoading(false);
			dispatch(setSession(session));
			dispatch(setUser(session?.user ?? null));
			dispatch(setLoading(false));
		});

		return () => subscription.unsubscribe();
	}, [dispatch]);

	return {
		session: authSession,
		isLoading,
		isAuthenticated: !!authSession,
		user: authSession?.user,
	};
}
