// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { parseTheme, theme } from './theme.svelte';

vi.mock('$app/environment', () => ({
	browser: true
}));

vi.hoisted(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		}))
	});
});

beforeEach(() => {
	localStorage.clear();
});

describe('parseTheme', () => {
	it('returns "dark" for "dark"', () => {
		expect(parseTheme('dark')).toBe('dark');
	});

	it('returns "light" for "light"', () => {
		expect(parseTheme('light')).toBe('light');
	});

	it('returns null for invalid values', () => {
		expect(parseTheme(null)).toBeNull();
		expect(parseTheme('invalid')).toBeNull();
		expect(parseTheme('')).toBeNull();
	});
});

describe('theme singleton', () => {
	it('toggles current value', () => {
		const before = theme.current;
		theme.toggle();
		expect(theme.current).not.toBe(before);
		theme.toggle();
		expect(theme.current).toBe(before);
	});

	it('writes preference to localStorage on toggle', () => {
		const before = theme.current;
		theme.toggle();
		expect(localStorage.getItem('theme')).toBe(theme.current);
		expect(localStorage.getItem('theme')).not.toBe(before);
	});
});
