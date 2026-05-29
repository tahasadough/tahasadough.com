export const navLinks = [
	{ href: '#about', name: 'About' },
	{ href: '#why-me', name: 'Why Me' },
	{ href: '#contact', name: 'Contact' }
] as const satisfies { href: string; name: string }[];
