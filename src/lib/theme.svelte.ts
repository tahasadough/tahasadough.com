import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

class ThemeManager {
	current = $state<Theme>('dark');

	constructor() {
		if (!browser) return;
		const stored = localStorage.getItem('theme') as Theme | null;
		if (stored === 'light' || stored === 'dark') {
			this.current = stored;
		} else {
			this.current = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		}
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		if (browser) {
			localStorage.setItem('theme', this.current);
		}
	}
}

export const theme = new ThemeManager();
