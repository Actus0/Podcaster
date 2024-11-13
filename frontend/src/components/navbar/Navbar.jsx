import React from 'react';
import { Link } from 'react-router-dom';
import { CgMenuLeftAlt } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux'


const Navbar = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const navLinks = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Category",
      path: "/category"
    },
    {
      name: "Podcasts",
      path: "/all-podcasts"
    }
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-zinc-800 text-gray-100 px-4 md:px-8 lg:px-12 py-2 flex justify-between items-center text-lg relative z-50">
      <div className="logo flex items-center brand-name">
        <img className='h-12 mr-2' src="/logo.png" alt="Podcastify" />
        <Link to="/" className="text-2xl font-semibold">Podcastify</Link>
      </div>
      <ul className="hidden lg:flex items-center justify-center nav-links">
        {navLinks.map((link, index) => (
          <li key={index} className="mx-4">
            <Link to={link.path} className="hover:font-semibold transition-all duration-150 hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className='hidden lg:flex items-center justify-end'>

        {!isLoggedIn && <><Link to="/login" className='px-6 py-3 hover:font-semibold transition-all duration-150 hover:underline border border-black rounded-full'>Login</Link>
          <Link to="/register" className='mx-4 px-6 py-3 hover:font-semibold transition-all duration-150 hover:underline bg-black text-white rounded-full'>Sign Up</Link>
        </>}
        {isLoggedIn && <> <Link to="/profile" className='py-4 hover:font-semibold transition-all duration-150 hover:underline text-black rounded-[100%]'><img className=' rounded-{100%} h-6  ' src="/user.png" alt="Profile" /></Link>
        </>}
      </div>
      <div className='lg:hidden flex items-center justify-end'>
        <button
          className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
          aria-label="Open menu"
          onClick={handleToggle}
        >
          <CgMenuLeftAlt />
        </button>
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-gray-700 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ zIndex: 49 }} // Ensures it stays below the navbar
        >
          <div className="w-full h-screen p-4 flex flex-col justify-center items-center">
            <button
              className='text-2xl absolute top-4 right-4 transform transition-transform duration-300'
              aria-label="Close menu"
              onClick={handleToggle}
            >
              <RxCross1 />
            </button>
            <ul className='flex flex-col justify-center items-center'>
              {navLinks.map((link, index) => (
                <li key={index} className="mx-4 mb-4">
                  <Link to={link.path} onClick={handleToggle} className="hover:font-semibold transition-all duration-150 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className='flex flex-col items-center justify-center'>
              {!isLoggedIn && <><Link to="/login" onClick={handleToggle} className='px-6 py-3 hover:font-semibold transition-all duration-150 hover:underline border border-black rounded-full mb-4'>Login</Link>
                <Link to="/register" onClick={handleToggle} className='px-6 py-3 hover:font-semibold transition-all duration-150 hover:underline bg-black text-white rounded-full mb-4'>Sign Up</Link></>}
              {isLoggedIn && <><Link to="/profile" onClick={handleToggle} className='px-6 py-3 hover:font-semibold transition-all duration-150 hover:underline text-black border border-black rounded-full'><img className=' rounded-{100%} h-6  ' src="/user.png" alt="Profile" /></Link></>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
