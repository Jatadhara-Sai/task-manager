import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            Task Manager
          </Link>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Tasks
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;