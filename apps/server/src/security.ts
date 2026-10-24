import type { NextFunction, Request, Response } from "express";
import type { CorsOptions } from "cors";

/**
 * Everything except the health check is a local tool: the admin pages, the
 * Chrome extension and the chat. A deployed copy (Vercel, or `pnpm start`)
 * only serves it when ENABLE_PRIVATE_API=true is set, so the public site
 * can't be used to spend API credit or write files.
 */
const isDeployed =
  Boolean(process.env.VERCEL) || process.env.NODE_ENV === "production";
export const privateApiEnabled =
  !isDeployed || process.env.ENABLE_PRIVATE_API === "true";

const publicPaths = new Set(["/api/health", "/health"]);

export function guardPrivateApi(req: Request, res: Response, next: NextFunction) {
  const isApi = req.path.startsWith("/api/") || req.path === "/chat";
  if (privateApiEnabled || !isApi || publicPaths.has(req.path)) return next();
  res.status(404).json({ error: "Not found" });
}

/** Only local pages and the Chrome extension may call the API from a browser. */
const allowedOrigin =
  /^(https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?|chrome-extension:\/\/[a-p]{32})$/;

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => callback(null, !origin || allowedOrigin.test(origin)),
};

/** Article slugs become file names, so only plain kebab-case is allowed. */
export function isSafeSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9][a-z0-9_-]{0,150}$/i.test(value);
}

export function validateSlugParam(
  req: Request,
  res: Response,
  next: NextFunction,
  slug: string,
) {
  if (isSafeSlug(slug)) return next();
  res.status(400).json({ error: "Invalid slug" });
}
