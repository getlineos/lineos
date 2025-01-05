import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function useMenubar() {
	const [dateTime, setDateTime] = useState<any>(dayjs());

	useEffect(() => {
		setInterval(() => {
			setDateTime(dayjs());
		}, 1000);
	}, []);

	return { dateTime };
}
