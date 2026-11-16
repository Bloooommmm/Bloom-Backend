import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "node:fs";
import { env } from "./env.js";

function getFirebaseApp() {
  if (getApps().length) return getApps()[0];
  const raw = env.firebaseServiceAccountJson;
  const path = env.firebaseServiceAccountPath;
  if (!raw && !path) throw new Error("Firebase Admin credentials are not configured");
  const serviceAccount = raw ? JSON.parse(raw) : JSON.parse(readFileSync(path!, "utf8"));
  return initializeApp({ credential: cert(serviceAccount) });
}

export async function verifyFirebaseToken(token: string) {
  return getAuth(getFirebaseApp()).verifyIdToken(token);
}
