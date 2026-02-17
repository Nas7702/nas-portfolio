"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type LogoSize = "sm" | "md";
type LogoVariant = "default" | "record";

interface LogoProps {
  className?: string;
  size?: LogoSize;
  variant?: LogoVariant;
  "data-testid"?: string;
}

const SIZE_STYLES: Record<LogoSize, { text: string; dot: string; padding: string }> = {
  sm: {
    text: "text-sm sm:text-[0.95rem] leading-none",
    dot: "h-[0.38rem] w-[0.38rem] sm:h-[0.44rem] sm:w-[0.44rem]",
    padding: "px-2.5 py-2",
  },
  md: {
    text: "text-[1.05rem] sm:text-[1.15rem] leading-none",
    dot: "h-[0.44rem] w-[0.44rem] sm:h-[0.52rem] sm:w-[0.52rem]",
    padding: "px-3 py-2",
  },
};

const containerBaseClasses = [
  "group",
  "relative",
  "inline-flex",
  "shrink-0",
  "items-center",
  "justify-center",
  "rounded-full",
  "transition",
  "duration-200",
  "ease-out",
  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-4",
  "focus-visible:outline-sky-300",
  "dark:focus-visible:outline-cyan-400",
  "min-h-10",
  "min-w-10",
  "select-none",
];

  const textBaseClasses = [
    "font-extrabold",
    "uppercase",
    "tracking-[0.12em]",
    "transition-colors",
    "duration-200",
    "ease-out",
  ];

  const textColors = {
    default: [
      "text-slate-900",
      "dark:text-slate-200",
      "group-hover:text-slate-700",
      "dark:group-hover:text-white",
      "group-focus-visible:text-slate-700",
      "dark:group-focus-visible:text-white",
    ],
    record: [
      "text-white", // Always white for record/creative
      "group-hover:text-gray-200",
      "group-focus-visible:text-gray-200",
    ],
  };
const dotBaseClasses = ["relative", "flex", "items-center", "justify-center", "rounded-full", "transition", "duration-200", "ease-out"];

const DOT_VARIANTS: Record<LogoVariant, string[]> = {
  default: [
    "bg-gradient-to-br",
    "from-sky-400",
    "via-cyan-300",
    "to-cyan-200",
    "dark:from-sky-400",
    "dark:via-cyan-300",
    "dark:to-cyan-200",
    "shadow-[0_0_8px_rgba(59,130,246,0.32)]",
    "dark:shadow-[0_0_12px_rgba(56,189,248,0.55)]",
    "before:absolute",
    "before:-inset-[0.45rem]",
    "before:rounded-full",
    "before:bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.32),_rgba(34,211,238,0.1)_60%,_rgba(34,211,238,0)_100%)]",
    "dark:before:bg-[radial-gradient(circle_at_center,_rgba(58,171,255,0.45),_rgba(14,165,233,0.18)_58%,_rgba(14,165,233,0)_100%)]",
    "before:backdrop-blur-[1.5px]",
    "before:opacity-70",
    "before:transition",
    "before:duration-300",
    "before:ease-out",
    "before:content-['']",
    "before:pointer-events-none",
    "before:animate-[logo-dot-glow_4s_ease-in-out_infinite]",
    "motion-reduce:before:animate-none",
    "after:absolute",
    "after:inset-0",
    "after:rounded-full",
    "after:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.45),_rgba(56,189,248,0)_70%)]",
    "after:opacity-0",
    "after:transition",
    "after:duration-200",
    "after:ease-out",
    "after:content-['']",
    "after:pointer-events-none",
    "group-hover:after:opacity-[0.62]",
    "group-focus-visible:after:opacity-[0.62]",
    "motion-safe:group-hover:after:translate-x-[0.14px]",
    "motion-safe:group-hover:after:-translate-y-[0.18px]",
    "motion-safe:group-focus-visible:after:translate-x-[0.14px]",
    "motion-safe:group-focus-visible:after:-translate-y-[0.18px]",
    "dark:group-hover:shadow-[0_0_16px_rgba(56,189,248,0.48)]",
    "dark:group-focus-visible:shadow-[0_0_16px_rgba(56,189,248,0.48)]",
    "group-hover:before:opacity-90",
    "group-hover:before:blur-[16px]",
    "group-focus-visible:before:opacity-90",
    "group-focus-visible:before:blur-[16px]",
    "motion-safe:group-hover:before:animate-[logo-dot-hover_1.9s_ease-in-out_infinite]",
    "motion-safe:group-focus-visible:before:animate-[logo-dot-hover_1.9s_ease-in-out_infinite]",
    "motion-reduce:group-hover:before:animate-none",
    "motion-reduce:group-focus-visible:before:animate-none",
    "motion-reduce:group-hover:before:blur-[14px]",
    "motion-reduce:group-focus-visible:before:blur-[14px]",
    "motion-reduce:group-hover:after:translate-x-0",
    "motion-reduce:group-hover:after:-translate-y-0",
    "motion-reduce:group-focus-visible:after:translate-x-0",
    "motion-reduce:group-focus-visible:after:-translate-y-0",
    "motion-reduce:group-hover:shadow-[0_0_8px_rgba(59,130,246,0.28)]",
    "motion-reduce:dark:group-hover:shadow-[0_0_12px_rgba(56,189,248,0.4)]",
    "motion-reduce:group-focus-visible:shadow-[0_0_8px_rgba(59,130,246,0.3)]",
    "motion-reduce:dark:group-focus-visible:shadow-[0_0_12px_rgba(56,189,248,0.45)]",
  ],
  record: [
    "bg-gradient-to-br",
    "from-[#39FF88]",
    "via-[#37FCA1]",
    "to-[#22E3B3]",
    "dark:from-[#39FF88]",
    "dark:via-[#32F08E]",
    "dark:to-[#1BCC74]",
    "shadow-[0_0_9px_rgba(57,255,136,0.38)]",
    "dark:shadow-[0_0_14px_rgba(57,255,136,0.55)]",
    "before:absolute",
    "before:-inset-[0.45rem]",
    "before:rounded-full",
    "before:bg-[radial-gradient(circle_at_center,_rgba(57,255,136,0.28),_rgba(50,240,142,0.12)_60%,_rgba(34,211,238,0)_100%)]",
    "dark:before:bg-[radial-gradient(circle_at_center,_rgba(57,255,136,0.46),_rgba(27,204,116,0.18)_60%,_rgba(13,148,136,0)_100%)]",
    "before:backdrop-blur-[1.8px]",
    "before:opacity-70",
    "before:transition",
    "before:duration-300",
    "before:ease-out",
    "before:content-['']",
    "before:pointer-events-none",
    "before:animate-[logo-dot-glow-record_3.6s_ease-in-out_infinite]",
    "motion-reduce:before:animate-none",
    "after:absolute",
    "after:inset-0",
    "after:rounded-full",
    "after:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.48),_rgba(57,255,136,0)_72%)]",
    "after:opacity-0",
    "after:transition",
    "after:duration-200",
    "after:ease-out",
    "after:content-['']",
    "after:pointer-events-none",
    "group-hover:after:opacity-[0.68]",
    "group-focus-visible:after:opacity-[0.68]",
    "motion-safe:group-hover:after:translate-x-[0.16px]",
    "motion-safe:group-hover:after:-translate-y-[0.18px]",
    "motion-safe:group-focus-visible:after:translate-x-[0.16px]",
    "motion-safe:group-focus-visible:after:-translate-y-[0.18px]",
    "dark:group-hover:shadow-[0_0_18px_rgba(57,255,136,0.52)]",
    "dark:group-focus-visible:shadow-[0_0_18px_rgba(57,255,136,0.52)]",
    "group-hover:before:opacity-92",
    "group-hover:before:blur-[18px]",
    "group-focus-visible:before:opacity-92",
    "group-focus-visible:before:blur-[18px]",
    "motion-safe:group-hover:before:animate-[logo-dot-record-hover_1.6s_ease-in-out_infinite]",
    "motion-safe:group-focus-visible:before:animate-[logo-dot-record-hover_1.6s_ease-in-out_infinite]",
    "motion-reduce:group-hover:before:animate-none",
    "motion-reduce:group-focus-visible:before:animate-none",
    "motion-reduce:group-hover:before:blur-[15px]",
    "motion-reduce:group-focus-visible:before:blur-[15px]",
    "motion-reduce:group-hover:after:translate-x-0",
    "motion-reduce:group-hover:after:-translate-y-0",
    "motion-reduce:group-focus-visible:after:translate-x-0",
    "motion-reduce:group-focus-visible:after:-translate-y-0",
    "motion-reduce:group-hover:shadow-[0_0_10px_rgba(57,255,136,0.3)]",
    "motion-reduce:dark:group-hover:shadow-[0_0_14px_rgba(57,255,136,0.45)]",
    "motion-reduce:group-focus-visible:shadow-[0_0_10px_rgba(57,255,136,0.32)]",
    "motion-reduce:dark:group-focus-visible:shadow-[0_0_14px_rgba(57,255,136,0.48)]",
  ],
};

export function Logo({ className, size = "md", variant = "default", "data-testid": dataTestId }: LogoProps) {
  const reduceMotion = useReducedMotion();

  const sizeStyles = SIZE_STYLES[size] ?? SIZE_STYLES.md;

  const composedContainerClassName = [
    ...containerBaseClasses,
    sizeStyles.padding,
    "hover:bg-black/5",
    "dark:hover:bg-white/10",
    "transition-colors",
    "duration-200",
  ]
    .concat(className ? [className] : [])
    .join(" ");

  const variantTextColors = textColors[variant] ?? textColors.default;
  const textClassName = [sizeStyles.text, ...textBaseClasses, ...variantTextColors].join(" ");

  const dotVariantClasses = DOT_VARIANTS[variant] ?? DOT_VARIANTS.default;
  const dotClassName = [sizeStyles.dot, ...dotBaseClasses, ...dotVariantClasses].join(" ");

  const interactiveProps = reduceMotion
    ? {}
    : {
        whileHover: "hover" as const,
        whileFocus: "hover" as const,
        whileTap: "press" as const,
      };

  // Use PNG logos for the record/creative variant
  if (variant === "record") {
    return (
      <Link
        href="/"
        aria-label="Nas - Home"
        title="Nas - Home"
        className="inline-flex items-center relative group select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 dark:focus-visible:outline-emerald-400 rounded-lg px-2 py-1 transition-colors duration-200"
        data-testid={dataTestId}
      >
        <motion.div
          initial="rest"
          animate="rest"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
            press: { scale: 0.95, transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] } },
          }}
          className="relative"
          {...interactiveProps}
        >
          <Image
            src="/logos/watermark-dark-transparent.png"
            alt="Nas.Create"
            width={size === "sm" ? 80 : 100}
            height={size === "sm" ? 32 : 40}
            className="object-contain drop-shadow-[0_0_10px_rgba(57,255,136,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(57,255,136,0.5)]"
            priority
          />
        </motion.div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Nas - Home"
      title="Nas - Home"
      className={composedContainerClassName}
      data-testid={dataTestId}
    >
      <motion.span
        initial="rest"
        animate="rest"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.015, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
          press: { scale: 0.985, transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] } },
        }}
        className="inline-flex items-center gap-[0.16em]"
        {...interactiveProps}
      >
        <span className={textClassName}>NAS</span>
        <motion.span
          className={dotClassName}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.055, transition: { duration: 0.18, ease: [0.33, 1, 0.68, 1] } },
            press: { scale: 0.965, transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] } },
          }}
        />
      </motion.span>
    </Link>
  );
}

export default Logo;

