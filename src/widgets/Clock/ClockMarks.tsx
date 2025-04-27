import React from "react";

interface ClockMarksProps {
	style: string;
}

const ClockMarks: React.FC<ClockMarksProps> = ({ style }) => {
	const hourMarks = [];
	const minuteMarks = [];

	for (let i = 0; i < 12; i++) {
		const angle = i * 30;
		const radius = 66;
		const x = 82.5 + radius * Math.sin((angle * Math.PI) / 180);
		const y = 82.5 - radius * Math.cos((angle * Math.PI) / 180);

		hourMarks.push(
			<div
				key={`hour-mark-${i}`}
				className="hour-mark"
				style={{ transform: `rotate(${angle}deg)` }}
			/>
		);

		const hourNumber = (
			<div
				key={`hour-number-${i}`}
				className="hour-number"
				style={{
					left: x - 12.5,
					top: y - 12.5,
				}}
			>
				{i === 0 ? 12 : i}
			</div>
		);

		hourMarks.push(hourNumber);

		for (let j = 1; j <= 4; j++) {
			if (j < 5) {
				minuteMarks.push(
					<div
						key={`minute-mark-${i}-${j}`}
						className="minute-mark"
						style={{ transform: `rotate(${i * 30 + j * 6}deg)` }}
					/>
				);
			}
		}
	}

	return (
		<div className={`hour-marks ${style}`}>
			{hourMarks}
			{minuteMarks}
		</div>
	);
};

export default ClockMarks;
