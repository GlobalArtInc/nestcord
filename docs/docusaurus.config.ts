import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.oceanicNext;

const defaultLocale = 'en';
const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const isPreview = process.env.NODE_ENV === 'preview';

const config: Config = {
	title: 'NestCord',
	tagline: 'A module for creating Discord bots using NestJS, based on Discord.js',
	url: 'https://nestcord.js.org',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'GlobalArtInc',
	projectName: 'nestcord',
	trailingSlash: isPreview,
	presets: [
		[
			'classic',
			/** @type {import("@docusaurus/preset-classic").Options} */
			{
				debug: isDev,
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/GlobalArtInc/nestcord/tree/main/docs',
					path: 'content',
					routeBasePath: '/',
					showLastUpdateAuthor: false,
					showLastUpdateTime: false,
					remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]]
				} satisfies DocsOptions,
				blog: false,
				pages: {
					path: 'src/pages'
				},
				theme: {
					customCss: [
						require.resolve('./src/css/admonition.scss'),
						require.resolve('./src/css/algolia.scss'),
						require.resolve('./src/css/custom.scss'),
						require.resolve('./src/css/font.scss'),
						require.resolve('./src/css/layout.scss'),
						require.resolve('./src/css/navbar.scss')
					]
				},
				sitemap: {
					changefreq: 'weekly',
					lastmod: 'date',
					priority: 0.5,
					ignorePatterns: ['/contributing/**']
				}
			} satisfies Preset.Options
		]
	],
	headTags: [
		{
			tagName: 'script',
			attributes: {
				type: 'application/ld+json'
			},
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					{
						'@type': 'WebSite',
						'@id': 'https://nestcord.js.org/#website',
						name: 'NestCord',
						alternateName: ['NestCord documentation', '@globalart/nestcord'],
						url: 'https://nestcord.js.org/',
						description: 'A module for creating Discord bots using NestJS, based on Discord.js',
						inLanguage: ['en', 'ru', 'de'],
						publisher: { '@id': 'https://nestcord.js.org/#organization' }
					},
					{
						'@type': 'Organization',
						'@id': 'https://nestcord.js.org/#organization',
						name: 'GlobalArt Inc',
						url: 'https://globalart.dev',
						logo: 'https://nestcord.js.org/img/logo-small.png',
						sameAs: [
							'https://github.com/GlobalArtInc',
							'https://www.npmjs.com/org/globalart'
						]
					},
					{
						'@type': 'SoftwareSourceCode',
						'@id': 'https://nestcord.js.org/#software',
						name: 'NestCord',
						alternateName: '@globalart/nestcord',
						description:
							'NestJS module for building Discord bots on top of Discord.js v14 with decorators, guards, interceptors and pipes.',
						url: 'https://nestcord.js.org/',
						codeRepository: 'https://github.com/GlobalArtInc/nestcord',
						programmingLanguage: 'TypeScript',
						runtimePlatform: 'Node.js',
						license: 'https://opensource.org/licenses/MIT',
						image: 'https://nestcord.js.org/img/preview.png',
						author: { '@id': 'https://nestcord.js.org/#organization' }
					}
				]
			})
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com'
			}
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'true'
			}
		}
	],
	themeConfig:
		/** @type {import("@docusaurus/preset-classic").ThemeConfig} */
		{
			algolia: {
				appId: 'N5JRHSHB9C',
				apiKey: '6597eb15c31c17ecd0d7eba39b7a3848',
				indexName: 'nestcord',
				contextualSearch: true,
				searchPagePath: false,
				insights: true
			},
			cname: 'nestcord.js.org',
			announcementBar: {
				id: 'banner',
				content:
					'⭐️ If you like NestCord, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/GlobalArtInc/nestcord">GitHub</a>! ⭐️',
				backgroundColor: '#c12549',
				textColor: '#fff',
				isCloseable: true
			},
			docs: {
				versionPersistence: 'none',
				sidebar: {
					hideable: false,
					autoCollapseCategories: false
				}
			},
			prism: {
				additionalLanguages: [
					'java',
					'latex',
					'haskell',
					'matlab',
					'PHp',
					'powershell',
					'bash',
					'diff',
					'json',
					'scss'
				],
				defaultLanguage: 'typescript',
				magicComments: [
					{
						className: 'theme-code-block-highlighted-line',
						line: 'highlight-next-line',
						block: { start: 'highlight-start', end: 'highlight-end' }
					},
					{
						className: 'code-block-error-line',
						line: 'This will error'
					}
				],
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme
			},
			image: 'img/preview.png',
			metadata: [
				{
					name: 'keywords',
					content:
						'nestcord, nestjs discord, nestjs discord bot, discord.js nestjs, discord bot framework, nestjs module, slash commands, typescript'
				},
				{ property: 'og:site_name', content: 'NestCord' },
				{ property: 'og:image:width', content: '1200' },
				{ property: 'og:image:height', content: '630' },
				{ property: 'og:image:alt', content: 'NestCord – NestJS module for Discord bots' },
				{ name: 'twitter:image:alt', content: 'NestCord – NestJS module for Discord bots' }
			],
			navbar: {
				logo: {
					alt: 'NestCord Logo',
					src: 'img/logo.svg'
				},
				items: [
					{
						label: 'Documentation',
						href: '/introduction'
					},
					{
						label: 'Examples',
						position: 'left',
						href: 'https://github.com/GlobalArtInc/nestcord/tree/main/examples'
					},
					{
						label: 'Community',
						position: 'left',
						href: 'https://discord.com/invite/4Tc9hssSAv'
					},
					{
						type: 'localeDropdown',
						position: 'right',
						dropdownItemsAfter: [
							{
								type: 'html',
								value: '<hr style="margin: 0.3rem 0;">'
							},
							{
								href: 'https://platform.ownlate.com/workspaces/c08d5107-8ec7-4c80-9f46-e36fa7eeab3a/projects/167bc9f8-0af5-4e6f-879f-6f9bc60caf5a/progress',
								label: 'Help Us Translate'
							}
						]
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
				links: [
					{
						title: 'Support us',
						items: [
							{ label: 'Contribute', to: '/contributing/contribution-guide' },
							{ label: 'Translate', href: 'https://platform.ownlate.com/workspaces/c08d5107-8ec7-4c80-9f46-e36fa7eeab3a/projects/167bc9f8-0af5-4e6f-879f-6f9bc60caf5a/progress' }
						]
					},
					{
						title: 'Community',
						items: [
							{ label: 'Discord', href: 'https://discord.gg/4Tc9hssSAv' },
							{
								label: 'GitHub Organization',
								href: 'https://github.com/GlobalArtInc'
							},
							{
								label: 'NPM Organization',
								href: 'https://www.npmjs.com/org/globalart'
							}
						]
					}
				],
				logo: {
					alt: 'NestCord Logo',
					src: 'img/logo.svg',
					href: 'https://nestcord.js.org'
				},
				copyright: `Copyright © 2003 - ${new Date().getFullYear()} • Built by <a target="_blank"e href="https://globalart.dev">GlobalArt Inc</a>`
			}
		} satisfies Preset.ThemeConfig,
	plugins: [
		'docusaurus-plugin-sass',
		[
			'@docusaurus/plugin-pwa',
			{
				debug: true,
				offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
				pwaHead: [
					{
						tagName: 'link',
						rel: 'icon',
						href: '/img/logo-small.png'
					},
					{
						tagName: 'link',
						rel: 'manifest',
						href: '/manifest.json' // your PWA manifest
					},
					{
						tagName: 'meta',
						name: 'theme-color',
						content: '#c12549'
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-capable',
						content: 'yes'
					},
					{
						tagName: 'meta',
						name: 'apple-mobile-web-app-status-bar-style',
						content: '#FFF'
					},
					{
						tagName: 'link',
						rel: 'apple-touch-icon',
						href: '/img/logo-small.png'
					},
					{
						tagName: 'link',
						rel: 'mask-icon',
						href: '/img/logo-small.png',
						color: '#c12549'
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileImage',
						content: '/img/logo-small.png'
					},
					{
						tagName: 'meta',
						name: 'msapplication-TileColor',
						content: '#FFF'
					}
				]
			}
		]
	],
	i18n: {
		defaultLocale,
		locales: ['en', 'ru', 'de'],
		path: 'i18n'
	}
};

module.exports = config;
