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
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [];

export const dictionary = {
		"/": [8],
		"/auth/login": [9,[2]],
		"/auth/register": [10,[2]],
		"/listen": [11,[3]],
		"/listen/albums": [12,[3,4]],
		"/listen/albums/[id]": [13,[3,4]],
		"/listen/albums/[id]/edit": [14,[3,4]],
		"/listen/artists": [15,[3,5]],
		"/listen/playlists": [16,[3,6]],
		"/listen/playlists/[id]": [17,[3,6]],
		"/upload": [18,[7]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';