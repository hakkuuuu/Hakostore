import { ShoppingBag } from 'lucide-react';
import { Link, useResolvedPath } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useProductStore } from '../store/useProductStore';
import { useEffect } from 'react';

export default function NavBar() {
  // const navLinks = ['Home', 'Products', 'Category'];
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === '/';

  const productCount = useProductStore((state) => state.products.length);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts(); // fetch when navbar mounts
  }, [fetchProducts]);

  return (
    <header className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-18 justify-between">
          <Link
            to="/"
            className="flex flex-row justify-center items-center gap-4"
          >
            <img src={logo} alt="logo" />
            <span>Hakostore</span>
          </Link>
          {/* <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link}>
                <Link to={link.toLowerCase()} className="hover:text-gray-400">
                  {link}
                </Link>
              </li>
            ))}
          </ul> */}

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* <ThemeSelector /> */}
            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingBag className="size-5" />
                  {productCount > 0 && (
                    <span className="badge badge-sm indicator-item bg-blue-500 text-white border-none">
                      {productCount}
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* <button className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700">
              Login
            </button> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
