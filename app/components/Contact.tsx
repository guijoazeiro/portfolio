"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FiArrowUpRight, FiCalendar, FiMail } from "react-icons/fi";

type ContactOptionKey = "cal" | "email" | "linkedin";
type FormField = "name" | "email" | "message";
type FormErrors = Partial<Record<FormField, string>>;
type SubmissionStatus = "idle" | "sending" | "success" | "error";

const CAL_COM_URL = process.env.NEXT_PUBLIC_CAL_COM_URL?.trim() || null;
const LINKEDIN_URL = "https://www.linkedin.com/in/guilherme-joazeiro";
const EMAIL_URL = "mailto:guilhermejoazeiro@gmail.com";

const contactOptions: Array<{
  key: ContactOptionKey;
  href: string | null;
  Icon: typeof FiCalendar | typeof FiMail | typeof FaLinkedin;
}> = [
  { key: "cal", href: CAL_COM_URL, Icon: FiCalendar },
  { key: "email", href: EMAIL_URL, Icon: FiMail },
  { key: "linkedin", href: LINKEDIN_URL, Icon: FaLinkedin },
];

const Contact = () => {
  const t = useTranslations("Contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  function clearFieldError(field: FormField) {
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!name.trim()) nextErrors.name = t("validation.required");
    if (!email.trim()) {
      nextErrors.email = t("validation.required");
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      nextErrors.email = t("validation.email");
    }
    if (!message.trim()) nextErrors.message = t("validation.required");

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) throw new Error();

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const statusMessage =
    status === "sending"
      ? t("sending")
      : status === "success"
        ? t("status.success")
        : status === "error"
          ? t("status.error")
          : "";

  return (
    <section className="mb-16 md:mb-24 reveal contact-section" id="contact">
      <div className="contact-section__container">
        <div className="experience-heading">
          <span className="experience-heading__bar" aria-hidden="true" />
          <h2 className="section-title">{t("h1")}</h2>
        </div>

        <div className="contact-layout">
          <div className="contact-panel contact-panel--info">
            <h3 className="contact-panel__title">{t("h2")}</h3>
            <p className="contact-panel__description">{t("h3")}</p>

            <div className="contact-options">
              {contactOptions.map(({ key, href, Icon }) => {
                const optionContent = (
                  <>
                    <span className="contact-option__icon" aria-hidden="true">
                      <Icon aria-hidden="true" focusable="false" />
                    </span>
                    <span className="contact-option__copy">
                      <span className="contact-option__title">
                        {t(`options.${key}.title`)}
                      </span>
                      <span className="contact-option__description">
                        {t(`options.${key}.description`)}
                      </span>
                    </span>
                    <span className="contact-option__action">
                      {!href && (
                        <span className="contact-option__unavailable">
                          {t(`options.${key}.unavailable`)}
                        </span>
                      )}
                      <FiArrowUpRight aria-hidden="true" focusable="false" />
                    </span>
                  </>
                );

                if (!href) {
                  return (
                    <div
                      className="contact-option contact-option--disabled"
                      aria-disabled="true"
                      key={key}
                    >
                      {optionContent}
                    </div>
                  );
                }

                const isExternal = key !== "email";

                return (
                  <a
                    className="contact-option"
                    href={href}
                    key={key}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={t(`options.${key}.ariaLabel`)}
                  >
                    {optionContent}
                  </a>
                );
              })}
            </div>

            <p className="contact-panel__footer">{t("footer")}</p>
          </div>

          <div className="contact-panel contact-panel--form">
            <h3 className="contact-panel__title">{t("formTitle")}</h3>
            <p className="contact-panel__description">
              {t("formDescription")}
            </p>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === "sending"}
            >
              <div className="contact-form__field-group">
                <label htmlFor="contact-name">{t("emailName")}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    clearFieldError("name");
                  }}
                  placeholder={t("namePlaceholder")}
                  autoComplete="name"
                  required
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  className="contact-form__field"
                />
                {errors.name && (
                  <p id="contact-name-error" className="contact-form__error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="contact-form__field-group">
                <label htmlFor="contact-email">{t("emailAddress")}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearFieldError("email");
                  }}
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  required
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className="contact-form__field"
                />
                {errors.email && (
                  <p id="contact-email-error" className="contact-form__error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="contact-form__field-group">
                <label htmlFor="contact-message">{t("emailMessage")}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    clearFieldError("message");
                  }}
                  placeholder={t("messagePlaceholder")}
                  required
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className="contact-form__field contact-form__field--message"
                />
                {errors.message && (
                  <p id="contact-message-error" className="contact-form__error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="contact-form__submit"
                disabled={status === "sending"}
                aria-disabled={status === "sending"}
              >
                <span>
                  {status === "sending" ? t("sending") : t("submit")}
                </span>
                <FiArrowUpRight aria-hidden="true" focusable="false" />
              </button>

              <p
                className={`contact-form__status contact-form__status--${status}`}
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
