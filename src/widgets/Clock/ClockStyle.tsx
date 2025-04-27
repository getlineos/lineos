import React from "react";
import ClockHands from "./ClockHands";
import ClockMarks from "./ClockMarks";

interface ClockStyleProps {
	style: string;
	hourDegrees: number;
	minuteDegrees: number;
	secondDegrees: number;
}

const ClockStyle: React.FC<ClockStyleProps> = ({
	style,
	hourDegrees,
	minuteDegrees,
	secondDegrees,
}) => {
	return (
		<div className={`card ${style}`}>
			<div className="clock-container">
				{style === "skeuomorphic" && (
					<>
						<div className="clock-bezel" />
						<div className="clock-reflection" />
					</>
				)}
				{style === "material-design" && <div className="clock-face-inner" />}
				{style === "neumorphism" && <div className="clock-face-inner" />}
				{style === "brutalism" && (
					<>
						<div className="clock-face-inner">
							<div className="clock-face-inner-2" />
						</div>
					</>
				)}
				{style === "glassmorphism" && (
					<div className="shapes-container">
						<div className="shape circle" />
						<div className="shape rounded-square" />
					</div>
				)}
				<div className="clock-face" />
				<ClockMarks style={style} />
				<ClockHands
					style={style}
					hourDegrees={hourDegrees}
					minuteDegrees={minuteDegrees}
					secondDegrees={secondDegrees}
				/>
				<div className="clock-center" />
			</div>
		</div>
	);
};

export default ClockStyle;
