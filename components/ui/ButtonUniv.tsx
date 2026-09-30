import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

const Button = ({
  color, text, Icon, count, onClick, active = false,
}: { text: string; color: any; Icon?: any; count?: number; onClick?: () => void; active?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={
        `group w-fit pr-5 flex items-center p-2 rounded-full text-sm
        transition-colors duration-150
        ${active
          ? `text-black`
          : 'hover:bg-gray-100'
        }`}
        style={active ? { backgroundColor: color.primary} : undefined}
    >
      {Icon && (
        <span 
          className="flex items-center justify-center w-10 h-10 mr-3 rounded-full flex-shrink-0"
          style={active ? { backgroundColor: color.pale } : undefined}
        >
          <Icon/>            
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