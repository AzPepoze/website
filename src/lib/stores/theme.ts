import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Theme } from '$lib/types';

const initialTheme: Theme = browser 
	? (localStorage.getItem('theme') as Theme) || 
	  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
	: 'dark';

export const theme = writable<Theme>(initialTheme);

if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.setAttribute('data-theme', value);
	});
}
