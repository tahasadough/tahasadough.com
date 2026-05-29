import { describe, it, expect } from 'vitest';
import { GET } from './+server';

describe('sitemap endpoint', () => {
	it('returns 200 with XML content type', async () => {
		const response = await GET();
		expect(response.status).toBe(200);

		const ct = response.headers.get('content-type') ?? '';
		expect(ct).toMatch(/application\/xml/i);
	});

	it('contains sitemap XML structure', async () => {
		const response = await GET();
		const text = await response.text();

		expect(text).toContain('<?xml version="1.0"');
		expect(text).toContain('<urlset');
		expect(text).toContain('<url>');
		expect(text).toContain('<loc>https://www.tahasadough.com</loc>');
		expect(text).toContain('</urlset>');
	});
});
