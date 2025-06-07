import { useNavigate } from "react-router";
import useDock from "./useDock";

export default function Dock() {
	const navigate = useNavigate();
	const { apps, wrapperRef, onItemsMouseEnter, onItemsMouseLeave } = useDock();

	return (
		<div
			className="absolute top-[28px] bottom-0 left-1 z-[999] flex items-center"
			onClick={() => navigate("/")}
		>
			<div
				className="w-[60px] p-0.5 overflow-x-hidden overflow-y-auto bg-white bg-opacity-10 m-auto rounded-[18px] scrollbar-hide transition-all ease-in-out duration-300"
				style={{ height: 55 * apps.length + 4 }}
			>
				<div ref={wrapperRef} className="flex flex-col items-start fixed">
					{apps.map(({ name, icon, slug }, idx) => (
						<div
							key={name}
							className="w-[55px] align-bottom flex flex-col items-center"
							style={{ transition: "all ease .2s" }}
							onMouseEnter={() => onItemsMouseEnter(idx)}
							onMouseLeave={() => onItemsMouseLeave(idx)}
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/${slug}`);
							}}
						>
							<img src={icon} className="select-none w-full" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
