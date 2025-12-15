import { browser } from '$app/environment';

class Screen {
	width = $state(0);
	height = $state(0);

	isDesktop = $derived(this.width > 768);

	constructor() {
		if (!browser) return;

		const update = () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		};

		window.addEventListener('resize', update);
		update();
	}
}

export const screen = new Screen();
