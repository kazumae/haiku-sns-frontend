import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  icon?: 'shiru' | 'yomu';  // アイコンの種類を指定
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick,
  icon 
}: ButtonProps) => {
  const baseStyles = `
    relative h-[48px] rounded-[10px]
    inline-flex items-center justify-center
    transition-colors font-["02UtsukushiMincho"]
    px-8  /* ボタン全体の左右パディングを32px（8 * 4px）に */
  `;

  const variantStyles = {
    primary: 'bg-[#FF5252] text-white hover:bg-[#FF3838]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  const textStyles = `
    relative text-center
    text-[24px] tracking-[0.4em]
    whitespace-nowrap
    pl-1  /* 文字の左側に微調整用パディング */
  `;

  const iconStyles = `
    relative w-full h-[18px]
    max-w-full overflow-hidden
    mr-4  /* アイコンと文字の間のスペース16px（4 * 4px）*/
  `;

  const getIconPath = (iconName?: string) => {
    if (!iconName) return '';
    return `/images/icon/${iconName}.svg`;
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      <div className="inline-flex items-center">
        {icon && (
          <div className={iconStyles}>
            <img
              src={getIconPath(icon)}
              alt={`${icon} icon`}
              width={24}
              height={18}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <span className={textStyles}>
          {children}
        </span>
      </div>
    </button>
  );
}; 