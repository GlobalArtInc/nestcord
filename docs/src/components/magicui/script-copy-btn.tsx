'use client';

import { useColorMode } from '@docusaurus/theme-common';
import { Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { HTMLAttributes, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
	showMultiplePackageOptions?: boolean;
	codeLanguage: string;
	lightTheme: string;
	darkTheme: string;
	commandMap: Record<string, string>;
	className?: string;
}

export function ScriptCopyBtn({
	showMultiplePackageOptions = true,
	codeLanguage,
	lightTheme,
	darkTheme,
	commandMap,
	className
}: ScriptCopyBtnProps) {
	const packageManagers = Object.keys(commandMap);
	const [packageManager, setPackageManager] = useState(packageManagers[0]);
	const [copied, setCopied] = useState(false);
	const [highlightedCode, setHighlightedCode] = useState('');
	const { colorMode: theme } = useColorMode();
	const command = commandMap[packageManager];

	useEffect(() => {
		async function loadHighlightedCode() {
			try {
				const { codeToHtml } = await import('shiki');
				const highlighted = await codeToHtml(command, {
					lang: codeLanguage,
					themes: {
						light: lightTheme,
						dark: darkTheme
					},
					defaultColor: theme === 'dark' ? 'dark' : 'light'
				});
				setHighlightedCode(highlighted);
			} catch (error) {
				console.error('Error highlighting code:', error);
				setHighlightedCode(`<pre>${command}</pre>`);
			}
		}

		loadHighlightedCode();
	}, [command, theme, codeLanguage, lightTheme, darkTheme]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className={cn('mx-auto w-full max-w-md rounded-md border border-border', className)}>
			<div className="flex items-center justify-between p-2">
				<div>
					{showMultiplePackageOptions && (
						<div className="inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
							{packageManagers.map(pm => (
								<Button
									key={pm}
									variant="ghost"
									size="sm"
									className={cn(
										'relative rounded-sm px-3 py-1.5 text-sm font-medium',
										'transition-all hover:bg-transparent focus-visible:outline-none',
										packageManager !== pm && 'hover:text-primary',
										packageManager === pm ? 'text-primary' : 'text-muted-foreground'
									)}
									onClick={() => setPackageManager(pm)}
								>
									{pm}
									{packageManager === pm && (
										<motion.div
											className="absolute inset-0 z-[-1] rounded-md bg-background shadow-sm"
											layoutId="activeTab"
											initial={false}
											transition={{
												type: 'spring',
												stiffness: 350,
												damping: 30
											}}
										/>
									)}
								</Button>
							))}
						</div>
					)}
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="relative h-8 w-8 rounded-md"
					onClick={copyToClipboard}
					aria-label={copied ? 'Copied' : 'Copy to clipboard'}
				>
					<span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
					<Copy
						className={`h-4 w-4 transition-all duration-300 ${copied ? 'scale-0' : 'scale-100'}`}
					/>
					<Check
						className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${copied ? 'scale-100' : 'scale-0'
							}`}
					/>
				</Button>
			</div>
			<div className="min-w-0 grow font-mono">
				{highlightedCode ? (
					<div
						className={`[&>pre]:overflow-x-auto [&>pre]:rounded-b-md [&>pre]:border-t [&>pre]:border-border [&>pre]:p-2 [&>pre]:px-4 [&>pre]:mb-0!  [&>pre]:font-mono ${theme === 'dark' ? 'dark' : 'light'
							}`}
						dangerouslySetInnerHTML={{ __html: highlightedCode }}
					/>
				) : (
					<pre className="rounded-b-md border-t border-border bg-white p-2 px-4 font-mono dark:bg-black">
						{command}
					</pre>
				)}
			</div>
		</div>
	);
}
