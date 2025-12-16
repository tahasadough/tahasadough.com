import { browser } from '$app/environment';

class Screen {
	width = $state(0);
	height = $state(0);

	isDesktop = $derived(this.width > 768);

	constructor() {
		if (!browser) return;

		window.addEventListener('resize', this.#update);
		this.#update();
	}

	#update() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
	}
}

export const screen = new Screen();
