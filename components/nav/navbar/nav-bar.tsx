import NavBarProfile from './nav-bar-profile';
import NavBarLinks from './nav-bar-links';
import NavMenuToggler from '../navmenu/nav-menu-toggler';

export default function NavBar() {
  return (
    <nav className='border-light-black fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b px-4 py-2 text-sm backdrop-blur md:px-14 md:py-6 xl:px-56'>
      <NavBarProfile />
      <NavBarLinks />
      <NavMenuToggler />
    </nav>
  );
}
