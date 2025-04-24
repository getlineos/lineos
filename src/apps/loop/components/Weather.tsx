import React from "react";
import { WiDayCloudy } from "react-icons/wi";
import { FaLeaf } from "react-icons/fa";

const Weather: React.FC = () => {
	return (
		<div className="bg-amber-50 rounded-xl p-6 relative overflow-hidden">
			<div className="flex justify-between items-start">
				<div>
					<h2 className="text-xl font-semibold mb-4">Weather</h2>
					<div className="flex items-center gap-2 mb-6">
						<WiDayCloudy className="text-4xl" />
						<span className="text-4xl font-bold">12°C</span>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<div>
							<p className="text-gray-600 text-sm">Wind</p>
							<div className="flex items-center gap-1">
								<FaLeaf className="text-green-500" />
								<span>2-4 km/h</span>
							</div>
						</div>
						<div>
							<p className="text-gray-600 text-sm">Pressure</p>
							<p>102m</p>
						</div>
						<div>
							<p className="text-gray-600 text-sm">Humidity</p>
							<p>42%</p>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 right-0 w-32">
				<img
					src="/umbrella-illustration.svg"
					alt="Weather illustration"
					className="w-full"
				/>
			</div>
		</div>
	);
};

export default Weather;
