import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent-press",
        ink: "bg-ink text-white hover:bg-ink/90",
        outline: "border border-line bg-white text-ink hover:bg-paper-2",
        ghost: "text-ink-soft hover:bg-paper-2 hover:text-ink",
        gold: "border border-line bg-white text-ink hover:bg-paper-2",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-line bg-white", className)}
      {...props}
    />
  );
}

export function Badge({
  className,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "accent" | "green" | "gold" | "muted" }) {
  const tones = {
    default: "bg-paper-2 text-ink",
    accent: "bg-accent/10 text-accent",
    green: "bg-accent-2/10 text-accent-2",
    gold: "bg-gold/15 text-ink",
    muted: "bg-transparent border border-line text-ink-soft",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-transparent px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-soft/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: HTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1.5 block text-sm font-medium text-ink", className)} {...props} />;
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-paper-2", className)}>
      <div
        className="h-full rounded-full bg-accent transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-xs font-medium text-ink-soft">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="px-8 py-12 text-center">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </Card>
  );
}

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="p-8">
      <Badge tone="muted">Coming soon</Badge>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">{description}</p>
      <p className="mt-6 text-xs uppercase tracking-wider text-ink-soft">
        Phase 1 ships Brand DNA, starter package, website, and content. Live ads and posting come next.
      </p>
    </Card>
  );
}

export function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-ink-soft">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
    </Card>
  );
}
