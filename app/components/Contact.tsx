"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const t = useTranslations("Contact");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.status === 200) {
      setStatus("Mensagem enviada com sucesso!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Ocorreu um erro ao enviar a mensagem.");
    }
  };

  return (
    <section className="mb-16 md:mb-24 reveal" id="contact">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">{t("h3")}</p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg text-sm">
        <div>
          <label
            htmlFor="name"
            className="block text-[var(--muted)] mb-1.5 text-xs uppercase tracking-wider"
          >
            {t("emailName")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-[var(--muted)] mb-1.5 text-xs uppercase tracking-wider"
          >
            {t("emailAddress")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-[var(--muted)] mb-1.5 text-xs uppercase tracking-wider"
          >
            {t("emailMessage")}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input min-h-[110px] resize-y"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Enviar
        </button>
        {status && <p className="text-[var(--muted-strong)]">{status}</p>}
      </form>
    </section>
  );
};

export default Contact;
