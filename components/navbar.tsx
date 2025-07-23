import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";

const Navbar = () => {
  return <div className="border-b">
    <div className="h-16 flex items-center  px-8">
        <StoreSwitcher/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
            <UserButton/>
        </div>
    </div>
  </div>;
};

export default Navbar;
