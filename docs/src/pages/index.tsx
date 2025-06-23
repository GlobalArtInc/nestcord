import { useHistory } from '@docusaurus/router';
import { ColorModeProvider } from '@docusaurus/theme-common/internal';
import ColorModeSwitch from '../components/color-mode-switch';
import { NestCordInstallScriptCopyBtn } from '../components/nestcord-install-script-copy-btn';
import { Button } from '../components/ui/button';

const LINKS = {
	discord: 'https://discord.js.org',
	nestjs: 'https://nestjs.com',
	community: 'https://discord.com/invite/4Tc9hssSAv',
	github: 'https://github.com/GlobalArtInc/nestcord'
} as const;

export default function Home() {
	const history = useHistory();

	const openLink = (url: string, onSite = false) => {
		onSite ? history.push(url) : window.open(url, '_blank');
	};

	return ColorModeProvider({
		children: (
			<div className="w-full max-w-screen-md lg:max-w-4xl px-4 mx-auto flex flex-col items-center justify-start space-y-6 min-h-screen pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
				<ColorModeSwitch />

				<h1 className="text-3xl md:text-7xl font-bold text-center text-primary">
					The best way to create{' '}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
						Discord
					</span>{' '}
					bots with{' '}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
						NestJS
					</span>
				</h1>

				<p className="text-center text-sm md:text-lg text-muted-foreground">
					This package uses the best of the NodeJS world under the hood.{' '}
					<a href={LINKS.discord} target="_blank" rel="noopener noreferrer">
						Discord.js
					</a>{' '}
					is the most powerful library for creating bots and{' '}
					<a href={LINKS.nestjs} target="_blank" rel="noopener noreferrer">
						Nest.js
					</a>{' '}
					is a progressive framework for creating well-architectured applications. This
					module provides fast and easy way for creating Discord bots and deep integration
					with your NestJS application.
				</p>

				<div className="flex flex-col items-center justify-center space-y-3 w-full max-w-md sm:max-w-lg lg:max-w-xl">
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center items-center">
						<Button
							onClick={() => openLink('/introduction', true)}
							className="w-full sm:w-auto"
						>
							Documentation
						</Button>

						<Button
							variant="outline"
							onClick={() => openLink(LINKS.community)}
							className="w-full sm:w-auto"
						>
							Community
						</Button>

						<Button
							variant="outline"
							onClick={() => openLink(LINKS.github)}
							className="w-full sm:w-auto"
						>
							GitHub
						</Button>
					</div>

					<small className="text-center text-muted-foreground text-xs my-2">
						or install it with package manager:
					</small>

					<div className="w-full">
						<NestCordInstallScriptCopyBtn />
					</div>
				</div>
			</div>
		)
	});
}
