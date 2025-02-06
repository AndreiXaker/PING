interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }
  
  export function Button({ children, className, ...props }: ButtonProps) {
    return (
      <button
        className={`px-4 py-2 font-semibold rounded-full text-white bg-transparent transition-all duration-200 hover:bg-white hover:text-black ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }