"use client";
import { cn } from "@/lib/utils";
import { useFeatureStore } from "@/providers/features-store";

type FeatureCardProps = {
  gradient: string;
  key: string;
  // children: React.ReactNode;
} & CardProps;

type CardProps = {
  id: string;
};

export const FeatureCard = ({ gradient, id, key }: FeatureCardProps) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  return (
    <div
      key={key}
      className={cn(
        "absolute inset-0 h-full w-full rounded-2xl transition-opacity",
        inViewFeature === id
          ? "active-card opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div
        className={cn(
          "gradient absolute inset-0 origin-bottom-left rounded-2xl bg-gradient-to-br",
          gradient
        )}
      />
      <span />
    </div>
  );
};
