import { useState, useEffect } from "react";

function inView(
  elementOrSelector,
  onStart,
  { root, margin: rootMargin, amount = "some" } = {}
) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
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
    threshold: typeof amount === "number" ? amount : thresholds[amount],
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
const thresholds = {
  some: 0,
  all: 1,
};
export default function useInView(
  ref,
  { root, margin, amount = false, once = false } = {}
) {
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
function resolveElements(elements, scope, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    let root = document;
    if (scope) {
      exports.invariant(
        Boolean(scope.current),
        "Scope provided, but no element detected."
      );
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
  /**
   * Return an empty array
   */
  return Array.from(elements || []);
}
