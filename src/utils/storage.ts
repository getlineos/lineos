class Storage {
	set = (key: string, data: any) => {
		localStorage.setItem(key, JSON.stringify(data));
	};

	get = (key: string): any => {
		return JSON.parse(localStorage.getItem(key as string) ?? "null");
	};

	remove = (key: string) => localStorage.removeItem(key);

	clear = () => localStorage.clear();

	append = (key: string, item: any) => {
		const current = this.get(key);
		if (Array.isArray(current)) {
			this.set(key, [...current, item]);
		} else {
			this.set(key, [item]);
		}
	};

	prepend = (key: string, item: any) => {
		const current = this.get(key);
		if (Array.isArray(current)) {
			this.set(key, [item, ...current]);
		} else {
			this.set(key, [item]);
		}
	};

	getMetaData = (key: string) => {
		const metaData = this.get("meta-data") ?? {};

		if (key) {
			return metaData[key];
		}

		return metaData;
	};

	setMetaData = (data: any) => {
		const metaData = this.get("meta-data") ?? {};
		this.set("meta-data", { ...metaData, ...data });
	};
}

const storage = new Storage();

export default storage;
