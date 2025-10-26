import TopBar from './TopBar';
import MainNav from './MainNav';

export default function Header() {
  return (
    <header dir="rtl" className="select-none">
      <TopBar />
      <MainNav />
    </header>
  );
}