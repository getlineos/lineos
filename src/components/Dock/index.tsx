import { useNavigate } from "react-router";
import useDock from "./useDock";

export default function Dock() {
	const navigate = useNavigate();
	const { apps, wrapperRef, onItemsMouseEnter, onItemsMouseLeave } = useDock();

	return (
		<div
			ref={wrapperRef}
			className="flex h-[70px] flex-row justify-center items-end bg-white fixed bottom-2 left-0 right-0 px-2 bg-opacity-10 w-max m-auto rounded-[18px]"
		>
			{apps.map(({ name, icon, onClick }, idx) => (
				<div
					key={name}
					className="w-[60px] align-bottom dock-item flex flex-col items-center mb-[3px]"
					style={{ transition: "all ease .2s" }}
					onMouseEnter={() => onItemsMouseEnter(idx)}
					onMouseLeave={() => onItemsMouseLeave(idx)}
					onClick={() => onClick?.(navigate)}
				>
					<img src={icon} className="select-none w-full" />
				</div>
			))}
		</div>
	);
}
