'use client';

interface ThemeCardProps {
  title: string;    // "お題目"
  content: string;  // お題目の内容
}

export const ThemeCard = ({ title, content }: ThemeCardProps) => {
  return (
    <div className="bg-white rounded-[10px] px-8 py-6 shadow-md h-[420px]">
      <div className="writing-vertical h-full relative">
        <div className="absolute right-1/2 transform translate-x-1/2">
          <div className="text-base tracking-[0.4em] font-['02UtsukushiMincho'] leading-loose text-white bg-[#FF5252] px-2 py-4">
            {title}
          </div>
        </div>
        <div className="text-base tracking-[0.4em] font-['02UtsukushiMincho'] leading-loose text-[#000] mt-24">
          {content}
        </div>
      </div>
    </div>
  );
}; 