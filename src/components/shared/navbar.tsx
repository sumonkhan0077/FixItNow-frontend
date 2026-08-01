"use client";

import {
  useState,
  useEffect,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import Link from "next/link";
import {
  Command,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  User,
  CreditCard,
  LifeBuoy,
  LogOut,
  ChevronDown,
  MoreVertical,
  Menu,
  X,
  Home,
  Wrench,
  PhoneCall,
  LucideProps,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetProfileResponse, NavbarProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { logout } from "@/service/auth/logout";
import { toast } from "sonner";
import { Button } from "../ui/button";

// Primary navigation links
const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "Contact Us", href: "/contactus", icon: PhoneCall },
  { label: "About Us", href: "/aboutus", icon: Users },
  ,
];
// // User dropdown options
// const userMenuGroups = [
//   [
//     { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//     { label: "Billing", href: "/billing", icon: CreditCard },
//     { label: "Settings", href: "/settings", icon: Settings },
//   ],
//   [{ label: "Support", href: "/support", icon: LifeBuoy }],
// ];

export function Navbar({ user }: NavbarProps) {
  const userMenuGroups = [
    [
      {
        label: "Dashboard",
        href:
          user?.role === "ADMIN"
            ? "/admin-dashboard"
            : user?.role === "TECHNICIAN"
              ? "/technician-dashboard"
              : "/dashboard",
        icon: LayoutDashboard,
      },
      { label: "Billing", href: "/billing", icon: CreditCard },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
    [{ label: "Support", href: "/contactus", icon: LifeBuoy }],
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      if (user?.role === "CUSTOMER") {
        router.push("/dashboard");
      } else if (user?.role === "TECHNICIAN") {
        router.push("/author-dashboard");
      } else if (user?.role === "ADMIN") {
        router.push("/admin-dashboard");
      }

      return;
    }

    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "flex h-16 items-center justify-between gap-4 transition-all duration-300 px-4 sm:px-6 lg:px-10  bg-white/5 backdrop-blur-xl  shadow-xl backdrop-saturate-150",
        )}
      >
        {/* Logo */}
        <Link href="/">
          <div className="mb-5">
            <span className="text-secondary text-4xl font-normal">FixIt</span>
            <span className="text-primary text-xl font-normal ">Now</span>
          </div>
        </Link>

        {/* Desktop Nav Links  */}
        <nav className="hidden items-center gap-1.5 md:flex uppercase">
          {navLinks.map((link) => {
            const Icon = link?.icon; 
            if (!Icon) return null;
            return (
              <Link
                key={link?.href}
                href={link?.href as string}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 text-sm !text-black uppercase transition-colors font-medium rounded-lg",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-4/5",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white hover:text-white",
                )}
              >
                <Icon className="size-4 opacity-80" />
                <span>{link?.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* ==================== DESKTOP USER MENU ==================== */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      className={cn(
                        "flex items-center gap-2 rounded-full p-1 pl-1.5 transition-all outline-none cursor-pointer border",
                        scrolled
                          ? "border-border hover:bg-accent"
                          : "border-white/20 hover:bg-white/15 text-white",
                      )}
                      aria-label="Open user menu"
                    >
                      <Avatar className="size-8 border border-white/20">
                        <AvatarImage
                          src={user?.profileImage ?? undefined}
                          alt={user?.name ?? "User"}
                        />
                        <AvatarFallback className="text-xs font-bold bg-primary/20 text-primary">
                          {user?.name
                            ? user.name.slice(0, 2).toUpperCase()
                            : "ME"}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="size-3.5 opacity-70 mr-1" />
                    </button>
                  }
                />

                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl p-2 shadow-xl border-border"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal px-2 py-1.5">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-foreground">
                          {user?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-1.5" />
                  {userMenuGroups.map((group, i) => (
                    <div key={i}>
                      <DropdownMenuGroup>
                        {group.map((item) => (
                          <DropdownMenuItem
                            key={item.href}
                            render={
                              <Link
                                href={item.href}
                                className="flex items-center gap-2.5 py-2 px-2 rounded-lg cursor-pointer"
                              >
                                <item.icon className="size-4 text-muted-foreground" />
                                <span className="font-medium text-sm">
                                  {item.label}
                                </span>
                              </Link>
                            }
                          ></DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="my-1.5" />
                    </div>
                  ))}
                  <DropdownMenuItem
                    variant="destructive"
                    className="flex items-center gap-2.5 py-2 px-2 rounded-lg cursor-pointer"
                    onClick={() => handleUserMenuAction("logout")}
                  >
                    <LogOut className="size-4" />
                    <span className="font-medium text-sm">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* ==================== MOBILE 3-DOT ALL-IN-ONE DROPDOWN ==================== */}
            <div className="md:hidden">
              <DropdownMenu
                open={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
              >
                <DropdownMenuTrigger
                  render={
                    <button
                      className={cn(
                        "flex items-center justify-center rounded-xl p-2 transition-all outline-none cursor-pointer border",
                        scrolled
                          ? "border-border hover:bg-accent text-foreground"
                          : "border-white/20 hover:bg-white/15 text-white",
                      )}
                      aria-label="Open menu"
                    >
                      <div
                        className={cn(
                          "transition-transform duration-300 ease-in-out",
                          mobileMenuOpen
                            ? "rotate-90 scale-110"
                            : "rotate-0 scale-100",
                        )}
                      >
                        {mobileMenuOpen ? (
                          <X className="size-5" />
                        ) : (
                          <Menu className="size-5" />
                        )}
                      </div>
                    </button>
                  }
                />

                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-2xl p-2.5 shadow-2xl border-border mr-1"
                >
                  {/* User Header Section */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal px-2 py-1.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 border border-border">
                          <AvatarImage
                            src={user?.profileImage ?? undefined}
                            alt={user?.name ?? "User"}
                          />
                          <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                            {user?.name
                              ? user.name.slice(0, 2).toUpperCase()
                              : "ME"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-foreground">
                            {user?.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {user?.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-1.5" />

                  {/* Primary Navigation Links */}
                  <DropdownMenuGroup>
                    <div className="px-2 py-1 text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
                      Navigation
                    </div>
                    {navLinks.map((link) => {
                      const Icon = link?.icon;
                      if (!Icon) return null;
                      return (
                        <DropdownMenuItem
                          key={link?.href}
                          render={
                            <Link
                              href={link?.href as string}
                              className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer"
                            >
                              <Icon className="size-4" />
                              <span className="font-medium text-sm !text-black uppercase">
                                {link?.label}
                              </span>
                            </Link>
                          }
                        ></DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-1.5" />

                  {/* User Account & Support Links */}
                  {userMenuGroups.map((group, i) => (
                    <div key={i}>
                      <DropdownMenuGroup>
                        {group.map((item) => (
                          <DropdownMenuItem
                            key={item.href}
                            render={
                              <Link
                                href={item.href}
                                className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer"
                              >
                                <item.icon className="size-4 text-muted-foreground" />
                                <span className="font-medium text-sm">
                                  {item.label}
                                </span>
                              </Link>
                            }
                          ></DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="my-1.5" />
                    </div>
                  ))}

                  {/* Sign Out Button */}
                  <DropdownMenuItem
                    variant="destructive"
                    className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer mt-1"
                    onClick={() => handleUserMenuAction("logout")}
                  >
                    <LogOut className="size-4" />
                    <span className="font-semibold text-sm">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <Link href={"/login"}>
            <Button className="cursor-pointer">Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
