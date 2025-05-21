import { ScriptCopyBtn } from "./magicui/script-copy-btn";

export function NestCordInstallScriptCopyBtn() {
	const customCommandMap = {
		npm: "npm install @globalart/nestcord discord.js",
		yarn: "yarn add @globalart/nestcord discord.js",
		pnpm: "pnpm add @globalart/nestcord discord.js",
	};
	return (
		<ScriptCopyBtn
			showMultiplePackageOptions={false}
			codeLanguage="shell"
			lightTheme=""
			darkTheme=""
			commandMap={customCommandMap}
		/>
	);
}
