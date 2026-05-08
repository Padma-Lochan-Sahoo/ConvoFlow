import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();

  const handleLogout = async () => {
    const success = await logout();
    if (success) navigate("/login");
  };

  return (
    <header className="bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 group transition-all">
            <div className="size-9 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
              <MessageSquare className="size-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">ConvoFlow</h1>
          </Link>

          {/* Right side nav */}
          <div className="flex items-center gap-1.5">
            <Link to="/settings" className="btn btn-ghost btn-sm gap-1.5">
              <Settings className="size-4" />
              <span className="hidden sm:inline text-xs">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-ghost btn-sm gap-1.5">
                  <User className="size-4" />
                  <span className="hidden sm:inline text-xs">Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  type="button"
                  className="btn btn-ghost btn-sm text-error gap-1.5 hover:bg-error/10"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline text-xs">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
