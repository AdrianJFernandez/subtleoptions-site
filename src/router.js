import { normalizePath, resolveRoute } from "./routes.js";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function warpThen(run) {
  if (reduceMotion) {
    run();
    return;
  }
  document.body.classList.add("nav-warping-out");
  window.setTimeout(() => {
    run();
    document.body.classList.remove("nav-warping-out");
    document.body.dataset.warpEntry = "burst";
    window.requestAnimationFrame(() => {
      document.body.classList.add("nav-warping-in");
      window.setTimeout(() => {
        document.body.classList.remove("nav-warping-in");
        delete document.body.dataset.warpEntry;
      }, 720);
    });
  }, 580);
}

function patchHead(route) {
  document.title = route.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", route.description);
}

/**
 * @param {HTMLElement} mountEl
 * @param {{ refreshEffects: () => void }} effects
 */
export function createRouter(mountEl, effects) {
  function paintRoute(pathWithQueryHash) {
    const url = new URL(pathWithQueryHash, location.origin);
    const pathname = normalizePath(url.pathname);
    const route = resolveRoute(pathname);

    patchHead(route);
    document.body.dataset.planet = route.planet;

    mountEl.innerHTML = route.view();
    effects.refreshEffects();
    route.afterMount();
  }

  function navigate(href, { replace = false, animate = true } = {}) {
    const url = new URL(href, location.origin);
    if (url.origin !== location.origin) {
      window.location.assign(href);
      return;
    }

    const pathname = normalizePath(url.pathname);
    const next = pathname + url.search + url.hash;
    const currentPath = normalizePath(location.pathname);

    const sameDestination =
      currentPath === pathname && location.search === url.search && location.hash === url.hash;

    if (sameDestination) return;

    const apply = () => {
      if (replace) window.history.replaceState(null, "", next);
      else window.history.pushState(null, "", next);
      paintRoute(next);
    };

    if (animate && !reduceMotion) warpThen(apply);
    else apply();
  }

  function bootFromUrl() {
    paintRoute(location.pathname + location.search + location.hash);
  }

  window.addEventListener("popstate", () => {
    paintRoute(location.pathname + location.search + location.hash);
  });

  return { navigate, bootFromUrl, paintRoute };
}
