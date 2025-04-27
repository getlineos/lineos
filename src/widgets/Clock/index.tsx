import React, { useEffect, useState } from "react";
import ClockStyle from "./ClockStyle";
import "./styles.css";

enum ClockStyleType {
	SKEUOMORPHIC = "skeuomorphic",
	FLAT_DESIGN = "flat-design",
	MATERIAL_DESIGN = "material-design",
	NEUMORPHISM = "neumorphism",
	GLASSMORPHISM = "glassmorphism",
	CLAYMORPHISM = "claymorphism",
	BRUTALISM = "brutalism",
	MINIMALISM = "minimalism",
}

const ClockWidget: React.FC = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const hours24 = time.getHours();
	const hours = hours24 % 12 || 12;
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();

	const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
	const minuteDegrees = minutes * 6 + seconds * 0.1;
	const secondDegrees = seconds * 6;

	return (
		<div className="min-w-[192.5px] h-[192.5px] overflow-hidden rounded-xl bg-white flex items-center justify-center">
			<ClockStyle
				style={ClockStyleType.FLAT_DESIGN}
				hourDegrees={hourDegrees}
				minuteDegrees={minuteDegrees}
				secondDegrees={secondDegrees}
			/>
		</div>
	);
};

export default ClockWidget;
