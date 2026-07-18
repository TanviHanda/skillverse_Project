import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'dark' | 'outline';
  type?: 'button' | 'submit' | 'reset'; 
}

export function Button({ 
  children, 
  onClick, 
  className = '', 
  disabled = false, 
  variant = 'primary',
  type = 'button' 
}: ButtonProps) {

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    dark: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border border-gray-700 text-white hover:bg-gray-900"
  };

  return (
    <motion.button
      type={type} // 3. type prop yahan apply kiya
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-bold transition-all ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
}