<script lang="ts">
	import { navLinks } from './nav';
</script>

<div class="group md:hidden">
	<input type="checkbox" id="menu-toggle" class="peer hidden" />

	<label
		for="menu-toggle"
		class="relative z-50 flex h-5 w-6 cursor-pointer flex-col items-center justify-center gap-2"
		aria-label="Toggle Menu"
	>
		<span
			class="h-0.5 w-full origin-center rounded-full bg-on-surface transition-all duration-300 ease-spring
      group-has-checked:translate-y-1.25
      group-has-checked:rotate-45"
		></span>
		<span
			class="h-0.5 w-full origin-center rounded-full bg-on-surface transition-all duration-300 ease-spring group-has-checked:-translate-y-1.25 group-has-checked:-rotate-45"
		></span>
	</label>

	<label
		for="menu-toggle"
		class="invisible fixed inset-0 z-30 min-h-dvh bg-black/50 opacity-0 transition-all duration-300 peer-checked:visible peer-checked:opacity-100"
		aria-hidden="true"
	></label>

	<nav
		id="mobile-menu"
		aria-label="Mobile menu"
		class="fixed top-0 right-0 z-40 w-full -translate-y-full border-b border-muted bg-elevated/95 backdrop-blur-lg transition-all duration-300 peer-checked:translate-y-0"
	>
		<label for="menu-toggle" class="block">
			<ul class="space-y-5 px-5 pt-16 pb-10 text-lg">
				{#each navLinks as link, i (i)}
					<li>
						<a href={link.href} class="block transition-all duration-500 hover:text-gray">
							{link.name}
						</a>
					</li>
				{/each}
			</ul>
		</label>
	</nav>
</div>
