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

  const inputCls =
    "w-full bg-transparent border border-gray-800 focus:border-[var(--link)] outline-none px-3 py-2 text-sm text-gray-200";

  return (
    <section className="mb-16" id="contact">
      <h2 className="section-title">{t("h1")}</h2>
      <p className="section-sub">{t("h3")}</p>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg text-sm">
        <div>
          <label htmlFor="name" className="block text-gray-400 mb-1">
            {t("emailName")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-400 mb-1">
            {t("emailAddress")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-400 mb-1">
            {t("emailMessage")}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputCls} min-h-[100px]`}
            required
          />
        </div>
        <button
          type="submit"
          className="border border-[var(--link)] text-[var(--link)] px-4 py-2 hover:bg-[var(--link)] hover:text-black transition-colors"
        >
          Enviar
        </button>
        {status && <p className="text-gray-400">{status}</p>}
      </form>
    </section>
  );
};

export default Contact;
