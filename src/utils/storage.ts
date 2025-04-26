class Storage {
	set = (key: string, data: any) => {
		localStorage.setItem(key, JSON.stringify(data));
	};

	get = (key: string): any => {
		return JSON.parse(localStorage.getItem(key as string) ?? "null");
	};

	remove = (key: string) => localStorage.removeItem(key);

	clear = () => localStorage.clear();
}

const storage = new Storage();

export default storage;
