export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["buttons.scss","favicon.png","form-control.scss","logo.png","public/audio/.DS_Store","public/audio/test/.DS_Store","public/audio/test/tracks/early_eyes_better_at_home.mp3","public/audio/test/tracks/early_eyes_clarity.mp3","public/audio/test/tracks/early_eyes_marigolds.mp3","public/audio/test/tracks/early_eyes_sunbathing.mp3","public/audio/test/tracks/early_eyes_wander.mp3","public/audio/test/tracks/glass_animals_gooey.mp3","public/audio/test/tracks/jack_stauber_two_time.mp3","public/audio/test/tracks/modest_mouse_night_on_the_sun.mp3","public/audio/test/tracks/oneeva_platform_9.mp3","public/audio/test/tracks/phantogram_10000_claps.mp3","public/audio/test/tracks/phantogram_all_dried_up.mp3","public/audio/test/tracks/phantogram_as_far_as_i_can_see.mp3","public/audio/test/tracks/phantogram_bloody_palms.mp3","public/audio/test/tracks/phantogram_futuristic_casket.mp3","public/audio/test/tracks/phantogram_let_me_go.mp3","public/audio/test/tracks/phantogram_mouthful_of_diamonds.mp3","public/audio/test/tracks/phantogram_running_from_the_cops.mp3","public/audio/test/tracks/phantogram_turn_it_off.mp3","public/audio/test/tracks/phantogram_when_im_small.mp3","public/audio/test/tracks/phantogram_you_are_the_ocean.mp3","public/img/.DS_Store","public/img/mg/covers/default.png","public/img/mg/covers/favorites.png","public/img/test/.DS_Store","public/img/test/covers/clarity.jpeg","public/img/test/covers/dancehall_places.jpeg","public/img/test/covers/eyelid_movies.jpeg","public/img/test/covers/gooey.jpeg","public/img/test/covers/marigolds.jpeg","public/img/test/covers/night_on_the_sun.jpeg","public/img/test/covers/platform_9.jpeg","public/img/test/covers/scrub.jpeg","public/img/test/covers/sunbathing.jpeg","public/img/test/covers/tubes.jpeg","public/img/test/covers/two_time.jpeg","robots.txt","style.scss","vars.scss"]),
	mimeTypes: {".scss":"text/x-scss",".png":"image/png",".mp3":"audio/mpeg",".jpeg":"image/jpeg",".txt":"text/plain"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.d702e1eb.js","imports":["_app/immutable/entry/start.d702e1eb.js","_app/immutable/chunks/index.fabf1593.js","_app/immutable/chunks/singletons.c6b7e358.js","_app/immutable/chunks/index.42440b8a.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.afa4d803.js","imports":["_app/immutable/entry/app.afa4d803.js","_app/immutable/chunks/index.fabf1593.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js'),
			() => import('./nodes/15.js'),
			() => import('./nodes/16.js'),
			() => import('./nodes/17.js'),
			() => import('./nodes/18.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/listen",
				pattern: /^\/listen\/?$/,
				params: [],
				page: { layouts: [0,3], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/listen/albums",
				pattern: /^\/listen\/albums\/?$/,
				params: [],
				page: { layouts: [0,3,4], errors: [1,,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/listen/albums/[id]",
				pattern: /^\/listen\/albums\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4], errors: [1,,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/listen/albums/[id]/edit",
				pattern: /^\/listen\/albums\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4], errors: [1,,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/listen/artists",
				pattern: /^\/listen\/artists\/?$/,
				params: [],
				page: { layouts: [0,3,5], errors: [1,,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/listen/playlists",
				pattern: /^\/listen\/playlists\/?$/,
				params: [],
				page: { layouts: [0,3,6], errors: [1,,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/listen/playlists/[id]",
				pattern: /^\/listen\/playlists\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,6], errors: [1,,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/upload",
				pattern: /^\/upload\/?$/,
				params: [],
				page: { layouts: [0,7], errors: [1,,], leaf: 18 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export const prerendered = new Set([]);
