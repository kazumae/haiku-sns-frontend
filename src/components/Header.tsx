import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            詠んでみた。
          </Link>
          <div className="text-sm text-gray-500">
            五七五で詠もう
          </div>
        </div>
      </div>
    </header>
  );
} 