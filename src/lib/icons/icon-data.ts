import type { IconType } from './types.js';

/**
 * SVG path element data structure
 */
export interface IconPathData {
	d?: string;
	stroke?: string;
	'stroke-linecap'?: string;
	'stroke-linejoin'?: string;
	'stroke-width'?: string | number;
	fill?: string;
}

/**
 * Icon data structure
 */
export interface IconData {
	viewBox: string;
	paths: IconPathData[];
	fill: 'none' | 'currentColor';
}

/**
 * Registry of all icon data
 */
export const iconRegistry: Record<IconType, IconData> = {
	'angle-right': {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'm1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'angle-up': {
		viewBox: '0 0 14 8',
		fill: 'none',
		paths: [
			{
				d: 'M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'angle-left': {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'm15 3-5.7 5.326a.909.909 0 0 0 0 1.348L15 15',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'angle-down': {
		viewBox: '0 0 14 8',
		fill: 'none',
		paths: [
			{
				d: 'M1 1 6.326 6.7a.91.91 0 0 0 1.348 0L13 1',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'arrow-left': {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M15 8H1M8 15 1 8l7-7',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'arrow-right': {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M1 8h14M8 1l7 7-7 7',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'arrow-up': {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M8 15V1M8 1 1 8l7 7',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'arrow-down': {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M8 1v14M8 15l7-7-7-7',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	check: {
		viewBox: '0 0 16 12',
		fill: 'none',
		paths: [
			{
				d: 'M1 5.917 5.724 10.5 15 1.5',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	clipboard: {
		viewBox: '0 0 18 20',
		fill: 'none',
		paths: [
			{
				d: 'M5 5h8m-1-3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2m6 0h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m0 9.464 2.025 1.965L12 9.571',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	copy: {
		viewBox: '0 0 18 20',
		fill: 'none',
		paths: [
			{
				d: 'M5 5h8m-1-3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2m6 0h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m0 9.464 2.025 1.965L12 9.571',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	close: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'm4 4 8 8M12 4l-8 8',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	download: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M8 11V1m0 10L4 7m4 4 4-4M1 14h14',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	edit: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M11.5 2.5a2.121 2.121 0 0 1 3 3L6.5 13.5 2 15l1.5-4.5L11.5 2.5Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	envelope: {
		viewBox: '0 0 20 20',
		fill: 'none',
		paths: [
			{
				d: 'M2 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'm2 4 8 6 8-6',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'envelope-full': {
		viewBox: '0 0 20 20',
		fill: 'currentColor',
		paths: [
			{
				d: 'm10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z'
			},
			{
				d: 'M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z'
			}
		]
	},
	export: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M11 8H1m10 0L8 5m3 3-3 3M4 1h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	eye: {
		viewBox: '0 0 20 14',
		fill: 'none',
		paths: [
			{
				d: 'M1 7s2-4 9-4 9 4 9 4-2 4-9 4-9-4-9-4Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'M10 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'folder-open': {
		viewBox: '0 0 20 18',
		fill: 'currentColor',
		paths: [
			{
				d: 'M4.09 7.586A1 1 0 0 1 5 7h13V6a2 2 0 0 0-2-2h-4.557L9.043.8a2.009 2.009 0 0 0-1.6-.8H2a2 2 0 0 0-2 2v14c.001.154.02.308.058.457L4.09 7.586Z'
			},
			{
				d: 'M6.05 9 2 17.952c.14.031.281.047.424.048h12.95a.992.992 0 0 0 .909-.594L20 9H6.05Z'
			}
		]
	},
	hamburger: {
		viewBox: '0 0 17 14',
		fill: 'none',
		paths: [
			{
				d: 'M1 1h15M1 7h15M1 13h15',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	home: {
		viewBox: '0 0 20 20',
		fill: 'none',
		paths: [
			{
				d: 'm10 2-8 8v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-8l-8-8Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'home-full': {
		viewBox: '0 0 20 20',
		fill: 'currentColor',
		paths: [
			{
				d: 'm19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z'
			}
		]
	},
	heart: {
		viewBox: '0 0 20 18',
		fill: 'none',
		paths: [
			{
				d: 'M17.367 3.842a4.583 4.583 0 0 0-6.484 0L10 4.725l-.883-.883a4.583 4.583 0 1 0-6.484 6.484l.884.883L10 17.692l6.483-6.483.884-.883a4.583 4.583 0 0 0 0-6.484Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'heart-full': {
		viewBox: '0 0 20 18',
		fill: 'currentColor',
		paths: [
			{
				d: 'M17.367 3.842a4.583 4.583 0 0 0-6.484 0L10 4.725l-.883-.883a4.583 4.583 0 1 0-6.484 6.484l.884.883L10 17.692l6.483-6.483.884-.883a4.583 4.583 0 0 0 0-6.484Z'
			}
		]
	},
	import: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M5 8H15M5 8l3-3m-3 3 3 3M12 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	info: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'M8 11V8M8 5h.01',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	minus: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M4 8h8',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	plus: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M8 4v8M4 8h8',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	print: {
		viewBox: '0 0 52 52',
		fill: 'currentColor',
		paths: [
			{
				d: 'M46.5,17.4h-41c-2.2,0-4,1.8-4,4v14c0,2.2,1.8,4,4,4h5.9l0,5.8c0,2.2,1.8,4,4,4h21.3c2.2,0,4-1.8,4-4l0-5.8h5.9c2.2,0,4-1.8,4-4v-14C50.5,19.2,48.7,17.4,46.5,17.4z M8.3,27.7c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3s3,1.3,3,3C11.3,26.4,10,27.7,8.3,27.7z M35.9,43.1c0,0.8-0.7,1.5-1.5,1.5h-17c-0.8,0-1.5-0.7-1.5-1.5v-9.8c0-0.8,0.7-1.5,1.5-1.5h17c0.8,0,1.5,0.7,1.5,1.5V43.1z'
			},
			{
				d: 'M40.5,11.1c0,0.8-0.7,1.5-1.5,1.5H12.8c-0.8,0-1.5-0.7-1.5-1.5V4.3c0-0.8,0.7-1.5,1.5-1.5H39c0.8,0,1.5,0.7,1.5,1.5V11.1z'
			}
		]
	},
	search: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M7.5 12.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'm11.536 11.536 3.464 3.464',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	settings: {
		viewBox: '0 0 16 16',
		fill: 'currentColor',
		paths: [
			{
				d: 'M9.1 4.4L8.6 2H7.4l-.5 2.4-.7.3-2-1.3-.9.8 1.3 2-.2.7-2.4.5v1.2l2.4.5.3.8-1.3 2 .8.8 2-1.3.8.3.4 2.3h1.2l.5-2.4.8-.3 2 1.3.8-.8-1.3-2 .3-.8 2.3-.4V7.4l-2.4-.5-.3-.8 1.3-2-.8-.8-2 1.3-.7-.2zM9.4 1l.5 2.4L12 2.1l2 2-1.4 2.1 2.4.4v2.8l-2.4.5L14 12l-2 2-2.1-1.4-.5 2.4H6.6l-.5-2.4L4 13.9l-2-2 1.4-2.1L1 9.4V6.6l2.4-.5L2.1 4l2-2 2.1 1.4.4-2.4h2.8zm.6 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8 9c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z'
			}
		]
	},
	sortable: {
		viewBox: '0 0 52 52',
		fill: 'currentColor',
		paths: [
			{
				d: 'M27.5,16c0.6-0.6,0.6-1.5,0-2.1L16.1,2.4c-0.6-0.6-1.5-0.6-2.1,0L2.5,13.9c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0l3.6-3.6c0.6-0.6,1.7-0.2,1.7,0.7v21.2c0,0.8,0.7,1.5,1.5,1.5h3c0.8,0,1.5-0.8,1.5-1.5V15.2c0-0.9,1.1-1.3,1.7-0.7l3.6,3.6c0.6,0.6,1.5,0.6,2.1,0L27.5,16z'
			},
			{
				d: 'M49.5,36L47.4,34c-0.6-0.6-1.5-0.6-2.1,0l-3.6,3.6c-0.6,0.6-1.7,0.2-1.7-0.7V15.5c0-0.8-0.7-1.5-1.5-1.5h-3c-0.8,0-1.5,0.8-1.5,1.5v21.2c0,0.9-1.1,1.3-1.7,0.7l-3.6-3.6c-0.6-0.6-1.5-0.6-2.1,0L24.5,36c-0.6,0.6-0.6,1.5,0,2.1L36,49.6c0.6,0.6,1.5,0.6,2.1,0l11.5-11.5C50.1,37.5,50.1,36.5,49.5,36z'
			}
		]
	},
	star: {
		viewBox: '0 0 20 20',
		fill: 'none',
		paths: [
			{
				d: 'm10 1 2.5 5.5L18 8l-4.5 4 1 6L10 15.5 5.5 18l1-6L2 8l5.5-1.5L10 1Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'star-full': {
		viewBox: '0 0 20 20',
		fill: 'currentColor',
		paths: [
			{
				d: 'm10 1 2.5 5.5L18 8l-4.5 4 1 6L10 15.5 5.5 18l1-6L2 8l5.5-1.5L10 1Z'
			}
		]
	},
	trash: {
		viewBox: '0 0 18 20',
		fill: 'none',
		paths: [
			{
				d: 'M4 6h10M4 6v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6M6 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'M2 4h14',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'M7 9v6M11 9v6',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'triangle-up': {
		viewBox: '0 0 16 16',
		fill: 'currentColor',
		paths: [
			{
				d: 'M8 2 2 14h12L8 2Z'
			}
		]
	},
	'triangle-down': {
		viewBox: '0 0 16 16',
		fill: 'currentColor',
		paths: [
			{
				d: 'M8 14 2 2h12L8 14Z'
			}
		]
	},
	'triangle-left': {
		viewBox: '0 0 16 16',
		fill: 'currentColor',
		paths: [
			{
				d: 'M2 8 14 2v12L2 8Z'
			}
		]
	},
	'triangle-right': {
		viewBox: '0 0 16 16',
		fill: 'currentColor',
		paths: [
			{
				d: 'M14 8 2 2v12l12-6Z'
			}
		]
	},
	'triangle-up-down': {
		viewBox: '0 0 24 24',
		fill: 'currentColor',
		paths: [
			{
				d: 'M17,14 C17.8092996,14 18.2680938,14.9010044 17.836059,15.5493995 L17.7682213,15.6401844 L12.7682213,21.6401844 C12.3950792,22.0879549 11.7283228,22.1178063 11.3160321,21.7297385 L11.2317787,21.6401844 L6.23177872,15.6401844 C5.71367776,15.0184632 6.11213562,14.0891988 6.88682851,14.0060047 L7,14 L17,14 Z M11.2317787,2.3598156 C11.6049208,1.91204508 12.2716772,1.88219371 12.6839679,2.2702615 L12.7682213,2.3598156 L17.7682213,8.3598156 C18.2863222,8.98153675 17.8878644,9.91080124 17.1131715,9.99399528 L17,10 L7,10 C6.19070043,10 5.73190618,9.09899556 6.16394105,8.45060047 L6.23177872,8.3598156 L11.2317787,2.3598156 Z'
			}
		]
	},
	user: {
		viewBox: '0 0 16 16',
		fill: 'none',
		paths: [
			{
				d: 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'M1.5 13.5c0-2 3-3.5 6.5-3.5s6.5 1.5 6.5 3.5V16H1.5v-2.5Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	warning: {
		viewBox: '0 0 20 20',
		fill: 'none',
		paths: [
			{
				d: 'M10 2 1 18h18L10 2Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			},
			{
				d: 'M10 8v4M10 14h.01',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	link: {
		viewBox: '0 0 19 19',
		fill: 'none',
		paths: [
			{
				d: 'M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	'mobile-phone': {
		viewBox: '0 0 20 20',
		fill: 'currentColor',
		paths: [
			{
				d: 'M12 0H2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7.5 17.5h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12 13H2V4h10v9Z'
			}
		]
	},
	phone: {
		viewBox: '0 0 18 18',
		fill: 'none',
		paths: [
			{
				d: 'm16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	},
	upload: {
		viewBox: '0 0 20 19',
		fill: 'none',
		paths: [
			{
				d: 'M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4',
				stroke: 'currentColor',
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': 2
			}
		]
	}
};

/**
 * Get icon data for a given icon type
 */
export function getIconData(type: IconType): IconData {
	return iconRegistry[type];
}
