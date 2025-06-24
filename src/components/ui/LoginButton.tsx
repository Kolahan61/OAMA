'use client';

export default function LoginButton() {
  const handleClick = () => {
    // Placeholder for login functionality
    console.log('Login button clicked');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-brand-red hover:bg-brand-redHover text-brand-white font-heading text-lg px-6 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md tracking-wide"
    >
      MEMBER LOGIN
    </button>
  );
} 