let src = "https://speedtest.telstra.com/";
src = "https://fast.com/";
src = "https://www.tldraw.com/";
src = "https://onlinenotepad.org/notepad";
src = "https://notepad.prinsh.com/";
src = "https://tweek.so/";
src = "https://mail.tm/en/";
src = "https://app.diagrams.net/";

export default function Notes() {
	return (
		<iframe
			src={src}
			className="w-full h-full border-0"
			title="Google Meet"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		/>
	);
}
