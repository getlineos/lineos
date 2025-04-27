import React from "react";

interface ClockHandsProps {
	style: string;
	hourDegrees: number;
	minuteDegrees: number;
	secondDegrees: number;
}

const ClockHands: React.FC<ClockHandsProps> = ({
	style,
	hourDegrees,
	minuteDegrees,
	secondDegrees,
}) => {
	return (
		<>
			<div
				className={`hour-hand hand ${style}`}
				style={{ transform: `rotate(${hourDegrees}deg)` }}
			/>
			<div
				className={`minute-hand hand ${style}`}
				style={{ transform: `rotate(${minuteDegrees}deg)` }}
			/>
			<div
				className={`second-hand hand ${style}`}
				style={{ transform: `rotate(${secondDegrees}deg)` }}
			/>
		</>
	);
};

export default ClockHands;
