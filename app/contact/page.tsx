"use client";

import { AlertTriangleIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useActionState, useId, useState } from "react";
import { contactAction } from "./_actions/contact-action";

export default function ContactPage() {
  const id = useId();

  return (
    <div className="min-h-full grid grid-rows-[auto_1fr] mx-auto max-w-screen-lg px-8">
      <a
        className="fixed top-0 left-0 -translate-y-full focus:translate-y-0 p-4 bg-white"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header className="border-b py-2">
        <Navigation />
      </header>

      <main className="py-8" id="main-content">
        <section aria-labelledby={id}>
          <h2 id={id}>The contact form section</h2>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

function useDisclosure() {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();

  function toggle() {
    setIsVisible((current) => !current);
  }

  return {
    id,
    isVisible,
    toggle,
  };
}

function Navigation() {
  const links = {
    home: { href: "/", label: "Home" },
    about: { href: "/about", label: "About" },
    search: { href: "/search", label: "Search" },
    network: { href: "/network", label: "Network" },
    contact: { href: "/contact", label: "Contact" },
  };

  const pathname = usePathname();

  const disclosure = useDisclosure();

  return (
    <div>
      <nav className="hidden md:block">
        <ul className="flex gap-x-4 flex-wrap" role="list">
          {Object.entries(links).map(([id, { href, label }]) => {
            const isCurrent = href === pathname;

            return (
              <li key={id}>
                <Link
                  aria-current={isCurrent ? "page" : undefined}
                  className="aria-[current]:underline"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav className="flex items-center justify-end md:hidden">
        <button
          aria-controls={disclosure.id}
          aria-expanded={disclosure.isVisible}
          onClick={disclosure.toggle}
          className="rounded p-2 hover:bg-neutral-100"
        >
          <MenuIcon aria-hidden="true" />
          <span className="sr-only">Navigation menu</span>
        </button>
      </nav>
      <div hidden={!disclosure.isVisible} id={disclosure.id}>
        <ul className="grid py-4 px-2 gap-y-2" role="list">
          {Object.entries(links).map(([id, { href, label }]) => {
            const isCurrent = href === pathname;

            return (
              <li key={id}>
                <Link
                  aria-current={isCurrent ? "page" : undefined}
                  className="aria-[current]:underline"
                  href={href}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function ContactForm() {
  const [formState, formAction, isPending] = useActionState(
    contactAction,
    undefined
  );

  return (
    <form action={formAction} className="grid gap-y-4">
      <TextInputField error={formState?.errors.name} label="Name" name="name" />
      <TextInputField
        autoComplete="email"
        error={formState?.errors.email}
        label="Email"
        name="email"
        type="email"
      />
      <TextAreaField
        error={formState?.errors.message}
        label="Message"
        name="message"
      />
      <div>
        <button
          aria-disabled={isPending}
          onClick={(event) => {
            if (isPending) {
              event.preventDefault();
            }
          }}
          className="bg-black px-4 py-2 rounded text-white font-semibold text-sm"
          type="submit"
        >
          Submit
        </button>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="text-red-500 flex items-center gap-x-2"
      >
        {formState?.message ? (
          <Fragment>
            <AlertTriangleIcon aria-hidden={true} className="size-5" />
            {formState?.message}
          </Fragment>
        ) : null}
      </div>
    </form>
  );
}

interface TextInputFieldProps {
  autoComplete?: "email";
  error?: string;
  label: string;
  name: string;
  type?: "email";
}

function TextInputField(props: TextInputFieldProps) {
  const { autoComplete, error, label, name, type } = props;

  const id = useId();

  return (
    <div className="grid gap-y-1">
      <label className="grid gap-y-1">
        <span>{label}</span>
        <input
          aria-describedby={id}
          autoComplete={autoComplete}
          aria-invalid={error != null}
          className="border rounded px-3 py-1"
          name={name}
          type={type}
        />
      </label>
      {error ? (
        <span className="text-red-600 flex items-center gap-x-2" id={id}>
          <AlertTriangleIcon aria-hidden={true} className="size-5" />
          {error}
        </span>
      ) : null}
    </div>
  );
}

interface TextAreaFieldProps {
  error?: string;
  label: string;
  name: string;
}

function TextAreaField(props: TextAreaFieldProps) {
  const { error, label, name } = props;

  const id = useId();

  return (
    <div className="grid gap-y-1">
      <label className="grid gap-y-1">
        <span>{label}</span>
        <textarea
          aria-describedby={id}
          aria-invalid={error != null}
          className="border rounded px-3 py-1"
          name={name}
        />
      </label>
      {error ? (
        <span className="text-red-600 flex items-center gap-x-2" id={id}>
          <AlertTriangleIcon aria-hidden={true} className="size-5" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
