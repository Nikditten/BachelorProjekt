import Link from "next/link";

export default function DeepLinkTwoPage() {
  return (
    <Link
      className="fixed px-4 py-2 text-white -translate-x-1/2 -translate-y-1/2 bg-blue-400 left-1/2 top-1/2"
      href="/deeplink/one"
    >
      Go back to page one
    </Link>
  );
}
