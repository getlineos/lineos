import AppFrame from "@/components/AppFrame";
import { AppConfig } from "@/config/apps";

let url = "https://speedtest.telstra.com/";
// url = "https://fast.com/";
// url = "https://mail.tm/en/";
// url = "https://pomofocus.io";
// url = "https://pomodorotimer.online";
url = "https://hoppscotch.io";

const zrxb: AppConfig = {
	name: "zrxb",
	icon: "zrxb",
	url,
	slug: "zrxb",
};

export default function ZrxbPage() {
	return <AppFrame app={zrxb} />;
}
