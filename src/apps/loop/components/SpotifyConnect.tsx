import React from "react";
import { BsSpotify } from "react-icons/bs";

const SpotifyConnect: React.FC = () => {
	return (
		<div className="bg-white p-6 rounded-2xl text-center">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png"
				alt="Spotify"
				className="w-12 h-12 mx-auto mb-4"
			/>
			<h3 className="text-xl font-semibold mb-2">
				Connect your Spotify account
			</h3>
			<p className="text-gray-600 mb-4">
				Empower yourself with habit tracking while enjoying uninterrupted music
			</p>
			<button className="w-full py-3 bg-black text-white rounded-xl flex items-center justify-center gap-2">
				<BsSpotify size={20} />
				Link Account
			</button>
		</div>
	);
};

export default SpotifyConnect;
