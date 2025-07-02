import { ColorModeProvider } from '@docusaurus/theme-common/internal';
import { ArrowRight, Code2, Cpu, Github, Layers, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import ColorModeSwitch from '../components/color-mode-switch';
import { Button } from '../components/ui/button';

const LINKS = {
	discord: 'https://discord.js.org',
	nestjs: 'https://nestjs.com',
	community: 'https://discord.com/invite/4Tc9hssSAv',
	github: 'https://github.com/GlobalArtInc/nestcord'
} as const;

const INSTALL_COMMANDS = {
	npm: 'npm install @globalart/nestcord discord.js',
	yarn: 'yarn add @globalart/nestcord discord.js',
	pnpm: 'pnpm add @globalart/nestcord discord.js',
	bun: 'bun add @globalart/nestcord discord.js'
};

const features = [
	{
		icon: Code2,
		title: 'Decorator-Based',
		description: 'Build with familiar NestJS decorators and dependency injection patterns for rapid development'
	},
	{
		icon: Layers,
		title: 'Modular Design',
		description: 'Organize your bot logic into clean, maintainable modules with enterprise-grade architecture'
	},
	{
		icon: Cpu,
		title: 'Type-Safe',
		description: 'Full TypeScript support with complete type definitions and intelligent auto-completion'
	}
];

function HomeContent() {
	const openLink = (url: string) => {
		window.open(url, '_blank');
	};

	const navigateToIntroduction = () => {
		window.location.href = '/introduction';
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.15
			}
		}
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94]
			}
		}
	};

	const featureVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut"
			}
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_80%,rgba(120,119,198,0.08),transparent_50%)]" />

			<ColorModeSwitch />

			<motion.div
				className="relative w-full mx-auto"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32">
					<div className="text-center space-y-16">
						<motion.div variants={itemVariants} className="space-y-10">
							<motion.div
								className="inline-flex items-center px-5 py-2.5 text-sm font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full shadow-lg border-2 border-slate-800 dark:border-slate-200"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 400 }}
							>
								<Sparkles className="h-4 w-4 mr-2.5 text-indigo-400 dark:text-indigo-600" />
								Discord.js + NestJS
							</motion.div>

							<h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight text-slate-900 dark:text-white">
								NestCord
							</h1>

							<div className="max-w-4xl mx-auto space-y-6">
								<p className="text-xl sm:text-2xl font-light text-slate-900 dark:text-white leading-relaxed">
									The best way to create Discord bots with NestJS
								</p>
								<p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
									Combines the power of Discord.js and NestJS architecture to provide fast and easy way for creating Discord bots with deep integration into your applications.
								</p>
							</div>
						</motion.div>

						<motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Button
								size="lg"
								className="group px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-lg font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
								onClick={navigateToIntroduction}
							>
								Get Started
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</Button>

							<Button
								variant="outline"
								size="lg"
								className="px-8 py-4 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 text-lg font-medium rounded-xl transition-all duration-200 hover:shadow-lg cursor-pointer"
								onClick={() => openLink(LINKS.github)}
							>
								<Github className="mr-2 h-5 w-5" />
								View on GitHub
							</Button>
						</motion.div>
					</div>
				</section>

				<section className="relative border-t border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-slate-50/50 to-white/50 dark:from-slate-900/50 dark:to-slate-950/50 backdrop-blur-sm">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
							className="grid grid-cols-1 lg:grid-cols-3 gap-8"
						>
							{features.map((feature, index) => (
								<motion.div
									key={feature.title}
									variants={featureVariants}
									whileHover={{
										y: -8,
										transition: { type: "spring", stiffness: 300 }
									}}
									className="group relative"
								>
									<div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 group-hover:shadow-2xl group-hover:shadow-slate-200/60 dark:group-hover:shadow-slate-900/60 transition-all duration-300" />
									<div className="relative p-8 space-y-6">
										<div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-800">
											<feature.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
										</div>
										<div className="text-center space-y-3">
											<h3 className="text-xl font-semibold text-slate-900 dark:text-white">
												{feature.title}
											</h3>
											<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
												{feature.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				<section className="relative border-t border-slate-200/60 dark:border-slate-800/60">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
						<motion.div
							variants={itemVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl p-12 sm:p-16 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50">
								<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />
								<div className="relative space-y-8">
									<h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white">
										Ready to build?
									</h2>
									<p className="text-xl text-slate-600 dark:text-slate-400 mx-auto leading-relaxed">
										Start building your Discord bot with modern TypeScript patterns and enterprise-grade architecture
									</p>
									<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
										<Button
											size="lg"
											className="group px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-lg font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
											onClick={navigateToIntroduction}
										>
											Read Documentation
											<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
										</Button>
										<Button
											variant="outline"
											size="lg"
											className="px-8 py-4 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 text-lg font-medium rounded-xl transition-all duration-200 hover:shadow-lg cursor-pointer"
											onClick={() => openLink(LINKS.community)}
										>
											<MessageCircle className="mr-2 h-5 w-5" />
											Join Community
										</Button>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</motion.div>
		</div>
	);
}

export default function Home() {
	return ColorModeProvider({
		children: <HomeContent />
	});
}
