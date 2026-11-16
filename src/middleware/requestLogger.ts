import type { NextFunction, Request, Response } from "express";

const COLORS = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

const SENSITIVE_KEYS = ["password", "token", "authorization", "cookie", "secret", "apikey", "otp", "buffer"];

function statusColor(status: number) {
  if (status < 300) return COLORS.green;
  if (status < 400) return COLORS.yellow;
  return COLORS.red;
}

function redact(value: unknown, seen = new WeakSet<object>()): unknown {
  if (!value || typeof value !== "object") return value;
  if (Buffer.isBuffer(value)) return "[REDACTED]";
  if (seen.has(value)) return "[CIRCULAR]";
  seen.add(value);
  if (Array.isArray(value)) return value.map((item) => redact(item, seen));
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => {
      const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, "");
      const sensitive = SENSITIVE_KEYS.some((name) => normalizedKey.includes(name));
      return [key, sensitive ? "[REDACTED]" : redact(item, seen)];
    }),
  );
}

function formatBody(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const serialized = JSON.stringify(redact(body));
  if (serialized === "{}" || serialized === "[]") return "";
  return serialized.length > 500 ? `${serialized.slice(0, 500)}...` : serialized;
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const originalJson = res.json.bind(res);
  let responseBody: unknown;

  res.json = ((body: unknown) => {
    responseBody = body;
    return originalJson(body);
  }) as Response["json"];

  res.on("finish", () => {
    const method = req.method.padEnd(6);
    const requestBody = req.is("multipart/form-data") ? "" : formatBody(req.body);
    const response = formatBody(responseBody);
    const separator = `${COLORS.dim}${"=".repeat(72)}${COLORS.reset}`;
    let line = `${separator}\n${COLORS.dim}${new Date().toISOString()}${COLORS.reset} ${COLORS.cyan}${method}${COLORS.reset} ${req.originalUrl} ${statusColor(res.statusCode)}${res.statusCode}${COLORS.reset} ${COLORS.magenta}${Date.now() - start}ms${COLORS.reset}`;
    if (req.ip) line += ` ${COLORS.dim}${req.ip}${COLORS.reset}`;
    if (requestBody) line += `\n  ${COLORS.dim}-> req:${COLORS.reset} ${requestBody}`;
    if (response) line += `\n  ${COLORS.dim}<- res:${COLORS.reset} ${response}`;
    console.log(line);
  });
  next();
}
