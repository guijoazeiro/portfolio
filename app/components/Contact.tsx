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
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="container mx-auto mb-5 p-5 md:p-0" id="contact">
      <h1 className="underline underline-offset-4 mb-5 text-2xl">{t("h1")}</h1>
      <div className="flex items-center justify-between flex-wrap">
        <div className=" p-5 w-full md:w-[49%] flex flex-col justify-between items-center mb-5 gap-10">
          <h4>{t("h2")}</h4>
          <p className="text-[16px] text-gray-300">{t("h3")}</p>
        </div>
        <div className="w-full md:w-[49%] p-5 flex flex-col justify-between items-center mb-5 gap-10">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label>{t("emailName")}</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border bg-zinc-800 bg-opacity-30 hover:border-gray-500 border-gray-800 rounded-md shadow-sm focus:outline-none sm:text-sm"
                required
              />
            </div>
            <div>
              <label>{t("emailAddress")}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border bg-zinc-800 bg-opacity-30 hover:border-gray-500 border-gray-800 rounded-md shadow-sm focus:outline-none sm:text-sm"
                required
              />
            </div>
            <div>
              <label>{t("emailMessage")}</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border bg-zinc-800 bg-opacity-30 hover:border-gray-500 border-gray-800 rounded-md shadow-sm focus:outline-none sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enviar
            </button>
            {status && <p className="mt-4 text-center">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
