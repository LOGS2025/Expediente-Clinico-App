import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

const Button = ({
  text,
  icon,
  count,
  onClick,
  active = false,
}: {
  text: string;
  icon?: StaticImport | string;
  count?: number;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-4 pl-4 pr-3 py-2 rounded-r-full text-sm
        transition-colors duration-150
        ${active
          ? 'bg-blue-300 text-blue-800 font-semibold'
          : 'text-gray-700 font-normal hover:bg-gray-100'
        }`}
    >
{icon && (
  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 flex-shrink-0">
    <Image
      className="w-4 h-4 object-contain bg-blue-500"
      src={icon}
      width={100}
      height={100}
      alt=""
    />
  </span>
)}
      <span className="flex-1 text-left truncate">{text}</span>
      {typeof count === 'number' && (
        <span
          className={`text-xs font-medium ${active ? 'text-blue-800' : 'text-gray-500'}`}
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default Button;