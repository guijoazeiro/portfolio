"use client";

import { CSSProperties, useEffect, useState } from "react";
import styles from "./BackgroundLogs.module.css";

const MESSAGES: readonly string[] = [
  "Worker started",
  "JWT validated",
  "Redis cache hit",
  "PostgreSQL pool connected",
  "Upload completed",
  "Deployment completed",
  "GitHub Actions succeeded",
  "Event published",
  "Consumer started",
  "Queue processed",
  "n8n workflow completed",
  "OpenAI response received",
  "EC2 instance healthy",
  "RDS connection established",
  "API request completed",
  "Kafka partition assigned",
  "RabbitMQ consumer ready",
  "Docker container running",
  "Health check passed",
  "Migration applied",
  "Cache warmed",
  "Backup completed",
  "Certificate renewed",
  "systemd unit active",
  "Go worker started",
  "gRPC stream opened",
  "Node process ready",
  "Spring context loaded",
  "S3 object uploaded",
  "CloudWatch metric flushed",
  "Cron job dispatched",
  "Lambda invocation ok",
  "Prometheus scrape ok",
  "Nginx reload complete",
  "TLS handshake ok",
];

const LEVELS: readonly [string, number][] = [
  ["INFO", 0.85],
  ["DEBUG", 0.1],
  ["WARN", 0.05],
];

interface LogEntry {
  id: number;
  text: string;
  top: number;
  left: number;
  duration: number;
  driftX: number;
  riseY: number;
  peakOp: number;
}

let counter = 0;
const startMs = Date.now();

const pickLevel = (): string => {
  const r = Math.random();
  let acc = 0;
  for (const [name, w] of LEVELS) {
    acc += w;
    if (r < acc) return name;
  }
  return "INFO";
};

const pickMessage = (): string => {
  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const level = pickLevel();
  const t = new Date(startMs + counter * 2800 + Math.random() * 3000);
  const iso = t.toISOString().slice(0, 19) + "Z";
  return `${iso} ${level} ${msg}`;
};

const getLimit = (): number => {
  if (typeof window === "undefined") return 3;
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 3;
};

const getPosition = (): { top: number; left: number } => {
  const top = 8 + Math.random() * 78;
  const w = typeof window === "undefined" ? 1440 : window.innerWidth;
  if (w >= 1200) {
    const leftGutter = Math.random() < 0.5;
    const left = leftGutter
      ? 1 + Math.random() * 14
      : 68 + Math.random() * 28;
    return { top, left };
  }
  return { top, left: 3 + Math.random() * 80 };
};

const nextDelay = (): number => 5000 + Math.random() * 7000;

export const BackgroundLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let alive = true;
    let timeoutId: number;

    const spawn = () => {
      if (!alive) return;
      setLogs((prev) => {
        if (prev.length >= getLimit()) return prev;
        counter += 1;
        const { top, left } = getPosition();
        return [
          ...prev,
          {
            id: counter,
            text: pickMessage(),
            top,
            left,
            duration: 12000 + Math.random() * 6000,
            driftX: (Math.random() - 0.5) * 16,
            riseY: -(60 + Math.random() * 40),
            peakOp: 0.07 + Math.random() * 0.05,
          },
        ];
      });
      timeoutId = window.setTimeout(spawn, nextDelay());
    };

    timeoutId = window.setTimeout(spawn, 2500 + Math.random() * 1500);

    return () => {
      alive = false;
      window.clearTimeout(timeoutId);
    };
  }, [enabled]);

  const removeLog = (id: number) =>
    setLogs((prev) => prev.filter((l) => l.id !== id));

  if (!enabled) return null;

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.parallax}>
        {logs.map((l) => {
          const style: CSSProperties = {
            top: `${l.top}%`,
            left: `${l.left}%`,
            animationDuration: `${l.duration}ms`,
            ["--drift-x" as string]: `${l.driftX}px`,
            ["--rise-y" as string]: `${l.riseY}px`,
            ["--peak-op" as string]: l.peakOp,
          };
          return (
            <span
              key={l.id}
              className={styles.log}
              style={style}
              onAnimationEnd={() => removeLog(l.id)}
            >
              {l.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
