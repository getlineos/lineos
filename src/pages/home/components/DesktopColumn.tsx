import DirectoryIcon from "assets/img/icons/directory.png";
import DocIcon from "assets/img/icons/doc.png";

enum DesktopItemI {
	DIRECTORY = "DIRECTORY",
	FILE = "FILE",
}

export default function DesktopColumn() {
	return (
		<div className="flex flex-col gap-7">
			<DesktopItem title="projects" type={DesktopItemI.DIRECTORY} />
			<DesktopItem />
			<DesktopItem />
			<DesktopItem title="abc" type={DesktopItemI.FILE} />
		</div>
	);
}

type DesktopItemProps = { title?: string; type?: DesktopItemI };

const DesktopItem = ({ title, type }: DesktopItemProps) => {
	const icon = getDektopItemIcon(type);

	return (
		<div>
			<img src={icon} alt="directory" className="w-16 h-auto" />
			<p className="text-sm text-white text-center">{title ?? "untitled"}</p>
		</div>
	);
};

const getDektopItemIcon = (type?: DesktopItemI) => {
	switch (type) {
		case DesktopItemI.FILE:
			return DocIcon;
		default:
			return DirectoryIcon;
	}
};
