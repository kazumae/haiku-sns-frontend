import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="w-full h-[72px] px-6 flex items-center justify-between">
      <Link 
        href="/"
        className="w-[35px] h-[35px] flex items-center justify-center transition-opacity hover:opacity-80"
      >
        <Image
          src="/images/icon/top.svg"
          alt="トップページへ"
          width={35}
          height={35}
          priority
        />
      </Link>

      <Link 
        href="/help"
        className="w-[28px] h-[31px] flex items-center justify-center transition-opacity hover:opacity-80"
      >
        <Image
          src="/images/icon/question.svg"
          alt="ヘルプページへ"
          width={28}
          height={31}
          priority
        />
      </Link>
    </header>
  );
}; 