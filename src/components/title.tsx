"use client";

import { cn } from "@/lib/utils";
import { useFeatureStore } from "@/providers/features-store";
import useInView from "@/hooks/index";
import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  id: string;
};

export interface FeatureTitleProps
  extends React.InputHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  id: string;
}

const FeatureTitle = React.forwardRef<HTMLParagraphElement, FeatureTitleProps>(
  ({ children, id, ...props }, ref) => {
    ref = useRef<HTMLParagraphElement>(null);
    const documentRef = useRef(document);

    const isInView = useInView(ref, {
      margin: "-50% 0px -50% 0px",

      root: documentRef,
    });
    const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);
    const inViewFeature = useFeatureStore((state) => state.inViewFeature);

    useEffect(() => {
      if (isInView) setInViewFeature(id);
      if (!isInView && inViewFeature === id) setInViewFeature(null);
    }, [isInView, id, setInViewFeature, inViewFeature]);
    console.log(inViewFeature);
    return (
      <p
        ref={ref}
        className={cn(
          "feature-title py-16 font-heading text-5xl transition-colors",
          isInView ? "text-black" : "text-gray-300"
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
export { FeatureTitle };
