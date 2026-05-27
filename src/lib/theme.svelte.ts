import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

export function parseTheme(value: string | null): Theme | null {
	if (value === 'light' || value === 'dark') return value;
	return null;
}

const STORAGE_KEY = 'theme';

class ThemeManager {
	current = $state<Theme>('dark');
	#mediaQuery: MediaQueryList | undefined;

	constructor() {
		if (!browser) return;
		const stored = parseTheme(localStorage.getItem(STORAGE_KEY));
		if (stored) {
			this.current = stored;
		} else {
			this.#mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
			this.current = this.#mediaQuery.matches ? 'light' : 'dark';
			this.#mediaQuery.addEventListener('change', this.#onPreferenceChange);
		}
	}

	#onPreferenceChange = (e: MediaQueryListEvent) => {
		if (localStorage.getItem(STORAGE_KEY) !== null) return;
		this.current = e.matches ? 'light' : 'dark';
	};

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		if (browser) {
			localStorage.setItem(STORAGE_KEY, this.current);
			this.#mediaQuery?.removeEventListener('change', this.#onPreferenceChange);
		}
	}

	destroy() {
		this.#mediaQuery?.removeEventListener('change', this.#onPreferenceChange);
	}
}

export const theme = new ThemeManager();
