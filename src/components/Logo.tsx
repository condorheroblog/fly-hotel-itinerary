import { cn } from "../lib/utils";

export function LogoMark({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 64 64" className={className} aria-hidden="true">
			<defs>
				<linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#38bdf8" />
					<stop offset="1" stopColor="#1d4ed8" />
				</linearGradient>
			</defs>
			<rect x="2" y="2" width="60" height="60" rx="15" fill="url(#logo-g)" />
			<path
				fill="#fff"
				d="M14 36.5 47 22.2c2.4-1 4.6 1.4 3.4 3.7L35.5 44l-1.8 9.4c-.4 2-3 2.5-4 .7l-4.6-8-8.9-4.9c-1.9-1-1-3.8 1.2-4.2Z"
			/>
			<circle cx="46" cy="18" r="3.4" fill="#fef08a" />
		</svg>
	);
}

export default function Logo({
	showText = true,
	className,
}: {
	showText?: boolean
	className?: string
}) {
	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
			<LogoMark className="h-9 w-9 drop-shadow-sm" />
			{showText && (
				<span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
					TripSheet
				</span>
			)}
		</span>
	);
}
