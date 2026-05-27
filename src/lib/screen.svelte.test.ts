import { describe, it, expect } from 'vitest';
import { screen } from './screen.svelte';

describe('screen singleton', () => {
	it('reads initial window dimensions as numbers', async () => {
		expect(typeof screen.width).toBe('number');
		expect(typeof screen.height).toBe('number');
	});

	it('derives isDesktop from width', async () => {
		expect(screen.isDesktop).toBe(screen.width > 768);
	});
});
