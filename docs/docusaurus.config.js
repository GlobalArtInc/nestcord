// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

const config = {
	title: 'NestCord',
	tagline: 'A module for creating Discord bots using NestJS, based on Discord.js',
	url: 'https://nestcord.globalart.dev',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'GlobalArtInc', // Usually your GitHub org/user name.
	projectName: 'nestcord', // Usually your repo name.
	presets: [
		[
			'classic',
			/** @type {import("@docusaurus/preset-classic").Options} */
			{
				debug: process.env.NODE_ENV !== 'production',
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/GlobalArtInc/nestcord/docs/tree/master',
					path: 'content',
					routeBasePath: '/',
					showLastUpdateAuthor: true,
					showLastUpdateTime: true,
					remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
				},
				blog: false,
				pages: false,
				theme: {
					customCss: require.resolve('./styles/custom.scss')
				},
				sitemap: {
					changefreq: 'weekly',
					priority: 0.5,
					ignorePatterns: ['/contributing/**']
				},
			}
		]
	],

	themeConfig:
	/** @type {import("@docusaurus/preset-classic").ThemeConfig} */
	{
		algolia: {
			appId: 'GDR17FGCRP',
			apiKey: '3b1db7ae29e71749b3e08e228a429418',
			indexName: 'nestcord',
			contextualSearch: true,
			schedule: 'every 1 day at 3:00 pm'
		},
		announcementBar: {
			content:
				'⭐️ If you like NestCord, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/GlobalArtInc/nestcord">GitHub</a>! ⭐️'
		},
		metadata: [
			{
				name: 'keywords',
				content: 'discord, discord-bot, framework, nestcord, github, open-source'
			},
			{ hid: 'og:site_name', property: 'og:site_name', content: 'NestCord' },
			{ hid: 'og:type', property: 'og:type', content: 'website' },
			{
				hid: 'og:image',
				property: 'og:image',
				content: 'https://nestcord.globalart.dev/img/preview.png'
			},
			{
				hid: 'og:image:secure_url',
				property: 'og:image:secure_url',
				content: 'https://nestcord.globalart.dev/img/preview.png'
			},
			{
				hid: 'og:image:alt',
				property: 'og:image:alt',
				content: 'NestCord'
			},
			{ hid: 'twitter:site', name: 'twitter:site', content: '@socketsomeone' },
			{
				hid: 'twitter:card',
				name: 'twitter:card',
				content: 'summary_large_image'
			},
			{
				hid: 'twitter:image',
				name: 'twitter:image',
				content: 'https://nestcord.globalart.dev/img/preview.png'
			},
			{
				hid: "twitter:image:alt",
				name: "twitter:image:alt",
				content: "NestCord",
			},
		],
		navbar: {
			logo: {
				alt: 'NestCord Logo',
				src: 'img/logo.svg'
			},
			items: [
				{
					label: 'Documentation',
					href: '/'
				},
				{
					label: 'Examples',
					position: 'left',
					href: 'https://github.com/GlobalArtInc/nestcord/tree/master/examples'
				},
				{
					label: 'Community',
					position: 'left',
					href: 'https://discord.com/invite/BBFhU8g'
				},

				{
					href: 'https://www.npmjs.com/package/@globalart/nestcord',
					position: 'right',
					className: 'header-npm-link',
					'aria-label': 'NPM'
				},
				{
					href: 'https://github.com/GlobalArtInc/nestcord',
					position: 'right',
					className: 'header-github-link',
					'aria-label': 'GitHub repository'
				}
			]
		},
		colorMode: {
			defaultMode: 'light',
			disableSwitch: false,
			respectPrefersColorScheme: true
		},
		footer: {
			copyright: `Copyright © 2003 - ${new Date().getFullYear()} • Built by <a target="_blank" href="https://globalart.dev">GlobalArt Inc</a>`
		},
		prism: {
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme
		}
	},
	plugins: [
		'docusaurus-plugin-sass',
		[
			'@docusaurus/plugin-pwa',
			{
				debug: true,
				offlineModeActivationStrategies: [
					'appInstalled',
					'standalone',
					'queryString',
				],
				pwaHead: [
					{
						tagName: 'link',
						rel: 'icon',
						href: '/img/logo-small.png',
					},
					{
						tagName: 'link',
						rel: 'manifest',
						href: '/manifest.json', // your PWA manifest
					},
					{
						tagName: 'meta',
						name: 'theme-color',
						content: '#c12549',
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-capable',
						content: 'yes',
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-status-bar-style',
						content: '#FFF',
					},
					{
						tagName: 'link',
						rel: 'apple-touch-icon',
						href: '/img/logo-small.png',
					},
					{
						tagName: 'link',
						rel: 'mask-icon',
						href: '/img/logo-small.png',
						color: '#c12549',
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileImage',
						content: '/img/logo-small.png',
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileColor',
						content: '#FFF',
					}
				]
			}
		]]
};

module.exports = config;
