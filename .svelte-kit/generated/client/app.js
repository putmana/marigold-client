export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [];

export const dictionary = {
		"/auth/login": [7,[2]],
		"/auth/register": [8,[2]],
		"/listen": [9,[3]],
		"/listen/albums": [10,[3,4]],
		"/listen/albums/[id]": [11,[3,4]],
		"/listen/artists": [12,[3,5]],
		"/listen/playlists": [13,[3,6]],
		"/listen/playlists/[id]": [14,[3,6]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';