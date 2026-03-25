import { badgeVariants } from "./badge";
import { cn } from "../../lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow ? (
        <div
          className={badgeVariants({
            variant: "muted",
            className: centered ? "mx-auto w-fit" : "w-fit",
          })}
        >
          {eyebrow}
        </div>
      ) : null}

      <h2
        className={cn(
          "mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl",
          titleClassName
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg",
            centered && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
