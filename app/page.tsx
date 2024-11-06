import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8">
      The example lives on the <Link className="underline" href="/contact">contact page</Link>.
    </main>
  );
}
