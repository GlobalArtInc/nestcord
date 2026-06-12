import { ColorModeProvider, useColorMode } from '@docusaurus/theme-common/internal';
import {
	ArrowRight,
	BookOpen,
	Bot,
	CheckCircle2,
	Code2,
	Copy,
	ExternalLink,
	Layers,
	MessageSquare,
	Shield,
	Star,
	Terminal,
	Zap
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { useState } from 'react';

const LINKS = {
	discord: 'https://discord.com/invite/4Tc9hssSAv',
	nestjs: 'https://nestjs.com',
	discordjs: 'https://discord.js.org',
	community: 'https://discord.com/invite/4Tc9hssSAv',
	github: 'https://github.com/GlobalArtInc/nestcord',
	npm: 'https://www.npmjs.com/package/@globalart/nestcord',
	docs: '/introduction'
} as const;

const INSTALL_COMMANDS = {
	npm: 'npm install @globalart/nestcord discord.js',
	yarn: 'yarn add @globalart/nestcord discord.js',
	pnpm: 'pnpm add @globalart/nestcord discord.js',
	bun: 'bun add @globalart/nestcord discord.js'
} as const;


const features = [
	{
		icon: Code2,
		title: 'Decorator-Based API',
		description:
			'Use familiar NestJS decorators like @SlashCommand, @Button, @Modal and more — no boilerplate, just clean expressive code.'
	},
	{
		icon: Layers,
		title: 'Modular Architecture',
		description:
			'Structure your bot with NestJS modules. Full support for providers, guards, interceptors, and pipes.'
	},
	{
		icon: Shield,
		title: 'Fully Type-Safe',
		description:
			'Complete TypeScript types for Discord interactions, commands, and events. Catch bugs at compile time.'
	},
	{
		icon: Zap,
		title: 'High Performance',
		description:
			'Built on Discord.js v14 and NestJS — battle-tested libraries trusted by millions of developers.'
	},
	{
		icon: Layers,
		title: 'Rich Ecosystem',
		description:
			'Pagination, sharding, localization, Lavalink and more — all built-in modules ready to plug in.'
	},
	{
		icon: Bot,
		title: 'All Interaction Types',
		description:
			'Slash commands, context menus, buttons, select menus, modals, autocomplete — everything Discord supports.'
	}
];


const itemVariants: Variants = {
	hidden: { y: 24, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }
	}
};

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { delayChildren: 0.1, staggerChildren: 0.12 }
	}
};

function PackageManagerTabs() {
	const [active, setActive] = useState<keyof typeof INSTALL_COMMANDS>('pnpm');
	const [copied, setCopied] = useState(false);

	const copy = () => {
		navigator.clipboard.writeText(INSTALL_COMMANDS[active]);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div className="flex gap-1 mb-0 bg-slate-100 dark:bg-slate-800 rounded-t-xl p-1 border border-b-0 border-slate-200 dark:border-slate-700">
				{(Object.keys(INSTALL_COMMANDS) as Array<keyof typeof INSTALL_COMMANDS>).map((pm) => (
					<button
						key={pm}
						onClick={() => setActive(pm)}
						className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
							active === pm
								? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
								: 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
						}`}
					>
						{pm}
					</button>
				))}
			</div>
			<div className="relative bg-slate-900 dark:bg-slate-950 rounded-b-xl rounded-tr-xl border border-slate-200 dark:border-slate-700 px-5 py-4 font-mono text-sm">
				<span className="text-emerald-400 select-none mr-2">$</span>
				<span className="text-slate-100">{INSTALL_COMMANDS[active]}</span>
				<button
					onClick={copy}
					className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
					aria-label="Copy"
				>
					{copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
				</button>
			</div>
		</div>
	);
}

const CODE_HTML = `<span class="text-purple-400">import</span> <span class="text-slate-500">{</span> <span class="text-sky-300">Injectable</span> <span class="text-slate-500">}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@nestjs/common'</span><span class="text-slate-500">;</span>
<span class="text-purple-400">import</span> <span class="text-slate-500">{</span> <span class="text-sky-300">Context</span><span class="text-slate-500">,</span> <span class="text-sky-300">SlashCommand</span><span class="text-slate-500">,</span> <span class="text-sky-300">SlashCommandContext</span> <span class="text-slate-500">}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@globalart/nestcord'</span><span class="text-slate-500">;</span>

<span class="text-rose-400">@Injectable</span><span class="text-slate-500">()</span>
<span class="text-purple-400">export class</span> <span class="text-sky-300">AppService</span> <span class="text-slate-500">{</span>
  <span class="text-rose-400">@SlashCommand</span><span class="text-slate-500">({</span>
    <span class="text-sky-300">name</span><span class="text-slate-500">:</span> <span class="text-amber-300">'ping'</span><span class="text-slate-500">,</span>
    <span class="text-sky-300">description</span><span class="text-slate-500">:</span> <span class="text-amber-300">'Ping-Pong command!'</span><span class="text-slate-500">,</span>
  <span class="text-slate-500">})</span>
  <span class="text-purple-400">async</span> <span class="text-sky-300">onPing</span><span class="text-slate-500">(</span><span class="text-rose-400">@Context</span><span class="text-slate-500">()</span> <span class="text-slate-300">[interaction]</span><span class="text-slate-500">:</span> <span class="text-sky-300">SlashCommandContext</span><span class="text-slate-500">) {</span>
    <span class="text-purple-400">return</span> <span class="text-slate-300">interaction</span><span class="text-slate-500">.</span><span class="text-sky-300">reply</span><span class="text-slate-500">({</span> <span class="text-sky-300">content</span><span class="text-slate-500">:</span> <span class="text-amber-300">'Pong!'</span> <span class="text-slate-500">});</span>
  <span class="text-slate-500">}</span>
<span class="text-slate-500">}</span>`;

function CodeBlock() {
	return (
		<div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/40 dark:shadow-slate-900/60">
			<div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
				<div className="flex gap-1.5">
					<div className="w-3 h-3 rounded-full bg-red-400" />
					<div className="w-3 h-3 rounded-full bg-yellow-400" />
					<div className="w-3 h-3 rounded-full bg-green-400" />
				</div>
				<div className="flex-1 text-center">
					<span className="text-xs text-slate-400 font-mono">app.service.ts</span>
				</div>
				<Terminal className="w-4 h-4 text-slate-400" />
			</div>
			<div className="bg-slate-900 dark:bg-slate-950 p-5 overflow-x-auto">
				<pre
					className="text-sm font-mono leading-relaxed m-0 text-slate-300"
					dangerouslySetInnerHTML={{ __html: CODE_HTML }}
				/>
			</div>
		</div>
	);
}

function ColorModeToggle() {
	const { colorMode, setColorMode } = useColorMode();
	return (
		<button
			onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
			className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer"
			aria-label="Toggle theme"
		>
			<span className="block dark:hidden text-base">🌙</span>
			<span className="hidden dark:block text-base">☀️</span>
		</button>
	);
}

function HomeContent() {
	const open = (url: string) => window.open(url, '_blank');
	const go = (path: string) => { window.location.href = path; };

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
			<ColorModeToggle />

			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-rose-500/5 dark:bg-rose-500/10 blur-3xl" />
					<div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/5 dark:bg-purple-500/8 blur-3xl" />
					<div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid lg:grid-cols-2 gap-16 items-center"
					>
						<div className="space-y-8">
							<motion.div variants={itemVariants}>
								<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 mb-6">
									<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
									Now with Discord.js v14 support
								</div>
								<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
									Build Discord bots
									<span className="block mt-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
										the NestJS way
									</span>
								</h1>
							</motion.div>

							<motion.p
								variants={itemVariants}
								className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
							>
								NestCord is a module that integrates Discord.js into NestJS applications — bringing
								decorators, dependency injection, and modular architecture to Discord bot development.
							</motion.p>

							<motion.div variants={itemVariants} className="flex flex-wrap gap-3">
								<button
									onClick={() => go(LINKS.docs)}
									className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-700 dark:hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
								>
									<BookOpen className="w-4 h-4" />
									Get Started
									<ArrowRight className="w-4 h-4" />
								</button>
								<button
									onClick={() => open(LINKS.github)}
									className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:-translate-y-0.5 cursor-pointer"
								>
									GitHub
									<ExternalLink className="w-3.5 h-3.5 opacity-60" />
								</button>
							</motion.div>
						</div>

						<motion.div variants={itemVariants}>
							<CodeBlock />
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Install */}
			<section className="border-t border-slate-100 dark:border-slate-800/60 py-20 bg-slate-50/50 dark:bg-slate-900/30">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
						className="space-y-8"
					>
						<motion.div variants={itemVariants}>
							<h2 className="text-3xl sm:text-4xl font-bold mb-3">Up and running in seconds</h2>
							<p className="text-slate-500 dark:text-slate-400">
								Install NestCord alongside Discord.js and start building.
							</p>
						</motion.div>
						<motion.div variants={itemVariants}>
							<PackageManagerTabs />
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Features */}
			<section className="py-24 border-t border-slate-100 dark:border-slate-800/60">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.15 }}
						className="space-y-16"
					>
						<motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
							<h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need</h2>
							<p className="text-lg text-slate-500 dark:text-slate-400">
								A complete toolkit for building production-ready Discord bots with familiar patterns and
								enterprise-grade architecture.
							</p>
						</motion.div>

						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{features.map((f, i) => (
								<motion.div
									key={f.title}
									variants={itemVariants}
									whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400 } }}
									className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all"
								>
									<div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 transition-colors">
										<f.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-rose-500 transition-colors" />
									</div>
									<h3 className="font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
									<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.description}</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>


			{/* CTA */}
			<section className="py-24 border-t border-slate-100 dark:border-slate-800/60">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						variants={itemVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-12 sm:p-16 text-center border border-slate-700"
					>
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(244,63,94,0.15),transparent_60%)]" />
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent_60%)]" />
						<div className="relative space-y-6">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm border border-white/10">
								<Star className="w-3.5 h-3.5 text-yellow-400" />
								Open Source · MIT License
							</div>
							<h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
								Ready to build your
								<br />
								Discord bot?
							</h2>
							<p className="text-lg text-slate-400 max-w-xl mx-auto">
								Join thousands of developers using NestCord to power their Discord bots. Start with the
								docs or ask the community for help.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
								<button
									onClick={() => go(LINKS.docs)}
									className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all hover:-translate-y-0.5 shadow-lg shadow-black/20 cursor-pointer"
								>
									<BookOpen className="w-4 h-4" />
									Read the Docs
									<ArrowRight className="w-4 h-4" />
								</button>
								<button
									onClick={() => open(LINKS.discord)}
									className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 cursor-pointer"
								>
									<MessageSquare className="w-4 h-4" />
									Join Discord
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}

export default function Home() {
	return (
		<ColorModeProvider>
			<HomeContent />
		</ColorModeProvider>
	);
}
