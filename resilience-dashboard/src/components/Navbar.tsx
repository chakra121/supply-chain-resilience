import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const navigate = useNavigate();
  const { role, setRole } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Nebula
        </div>

        {/* Nav */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Button variant="ghost" onClick={() => navigate("/")}>
                  Home
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {!role && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Button onClick={() => navigate("/auth")}>Login</Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}

            {role && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button
                      variant="outline"
                      onClick={() =>
                        navigate(role === "analyst" ? "/analyst" : "/executive")
                      }
                    >
                      Dashboard
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setRole(null);
                        navigate("/");
                      }}
                    >
                      Logout
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
