import { describe, it, expect } from 'vitest';

describe('sitemap endpoint', () => {
	it('returns 200 with XML content type', async () => {
		const { GET } = await import('./+server');
		const response = await GET();
		expect(response.status).toBe(200);
		expect(response.headers.get('content-type')).toBe('application/xml');
	});

	it('contains sitemap XML structure', async () => {
		const { GET } = await import('./+server');
		const response = await GET();
		const text = await response.text();
		expect(text).toContain('<?xml version="1.0"');
		expect(text).toContain('<urlset');
		expect(text).toContain('https://www.tahasadough.com');
	});
});
