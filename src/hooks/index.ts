import { useState, useEffect, MutableRefObject } from "react";

interface RefObject<T> {
  readonly current: T | null;
}
interface InViewOptions {
  root?: Element | Document;
  margin?: string;
  amount?: "some" | "all" | number;
}
interface RefObject<T> {
  readonly current: T | null;
}
interface Options extends Omit<InViewOptions, "root" | "amount"> {
  root?: RefObject<Element> | MutableRefObject<Document>;
  once?: boolean;
  amount?: "some" | "all" | number;
}
type ElementOrSelector = Element | Element[] | NodeListOf<Element> | string;
type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;

const thresholds = {
  some: 0,
  all: 1,
};

function inView(
  elementOrSelector: ElementOrSelector,
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  { root, margin: rootMargin, amount }: InViewOptions
): VoidFunction {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = new WeakMap();
  const onIntersectionChange = (entries: any[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const onEnd = activeIntersections.get(entry.target);
      /**
       * If there's no change to the intersection, we don't need to
       * do anything here.
       */
      if (entry.isIntersecting === Boolean(onEnd)) return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: 0,
  });
  elements.forEach((element: Element) => observer.observe(element));
  return () => observer.disconnect();
}

export default function useInView(
  ref: RefObject<Element>,
  { root, margin, amount, once }: Options
): boolean {
  const [isInView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || (once && isInView)) return;
    const onEnter = () => {
      setInView(true);
      return once ? undefined : () => setInView(false);
    };
    const options = {
      root: (root && root.current) || undefined,
      margin,
      amount,
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once]);
  return isInView;
}

function resolveElements(
  elements: any,
  scope?: { current: Document } | undefined,
  selectorCache?: { [x: string]: ElementOrSelector } | undefined
) {
  var _a;
  if (typeof elements === "string") {
    let root = document;
    if (scope) {
      Boolean(scope.current), "Scope provided, but no element detected.";

      root = scope.current;
    }
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0
        ? _a
        : (selectorCache[elements] = root.querySelectorAll(elements));
      elements = selectorCache[elements];
    } else {
      elements = root.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from<any>(elements || []);
}
