import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAppSelector } from "@/store/hooks";
import { setAuthRequired } from "@/store/slices/auth";
import { useDispatch } from "react-redux";

export default function AuthGuard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isLoading } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!user && !isLoading) {
			dispatch(setAuthRequired(true));
			navigate("/store");
		}
	}, [user, navigate, dispatch, isLoading]);

	if (!user) {
		return null;
	}

	return <Outlet />;
}
