export function Button({ children, className = "", variant = "default", ...props }) {
  const baseStyles = "px-6 py-2 rounded-lg font-semibold transition-all duration-200";
  
  const variants = {
    default: "",
    outline: "bg-transparent border-2",
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
