import Link from "next/link";

export default function DeepLinkPage() {
  return (
    <Link
      className="fixed px-4 py-2 text-white bg-blue-400 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      href="/deeplink/one"
    >
      Go to page one
    </Link>
  );
}
