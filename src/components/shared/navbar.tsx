"use client";

import { useState, useEffect } from "react";
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

// Primary navigation links
const navLinks = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Team", href: "/team", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

// User dropdown options
const userMenuGroups = [
  [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  [{ label: "Support", href: "/support", icon: LifeBuoy }],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          "flex h-16 items-center justify-between gap-4 transition-all duration-300 px-4 sm:px-6 lg:px-10",
          scrolled
            ? "bg-background/85 border-b border-border shadow-lg shadow-black/5 backdrop-blur-xl"
            : ""
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <Command className="size-5" />
          </div>
          <span
            className={cn(
              "text-xl font-bold tracking-tight transition-colors",
              scrolled ? "text-foreground" : "text-white"
            )}
          >
            Acme<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav Links (শুধু বড় স্ক্রিনে দেখাবে) */}
        <nav className="hidden items-center gap-1.5 md:flex uppercase">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 text-sm font-semibold uppercase transition-colors rounded-lg",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-4/5",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white hover:text-white"
                )}
              >
                <Icon className="size-4 opacity-80" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
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
                        : "border-white/20 hover:bg-white/15 text-white"
                    )}
                    aria-label="Open user menu"
                  >
                    <Avatar className="size-8 border border-white/20">
                      <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                      <AvatarFallback className="text-xs font-semibold">
                        JD
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
                        Jane Doe
                      </span>
                      <span className="text-xs text-muted-foreground">
                        jane@acme.com
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1.5" />
                {userMenuGroups.map((group, i) => (
                  <div key={i}>
                    <DropdownMenuGroup>
                      {group.map((item) => (
                        <DropdownMenuItem key={item.href} render={<Link
                            href={item.href}
                            className="flex items-center gap-2.5 py-2 px-2 rounded-lg cursor-pointer"
                          >
                            <item.icon className="size-4 text-muted-foreground" />
                            <span className="font-medium text-sm">
                              {item.label}
                            </span>
                          </Link>}>
                          
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-1.5" />
                  </div>
                ))}
                <DropdownMenuItem
                  variant="destructive"
                  className="flex items-center gap-2.5 py-2 px-2 rounded-lg cursor-pointer"
                  onClick={() => console.log("Sign out clicked")}
                >
                  <LogOut className="size-4" />
                  <span className="font-medium text-sm">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ==================== MOBILE 3-DOT ALL-IN-ONE DROPDOWN ==================== */}
          <div className="md:hidden">
        <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DropdownMenuTrigger
            render={
              <button
                className={cn(
                  "flex items-center justify-center rounded-xl p-2 transition-all outline-none cursor-pointer border",
                  scrolled
                    ? "border-border hover:bg-accent text-foreground"
                    : "border-white/20 hover:bg-white/15 text-white"
                )}
                aria-label="Open menu"
              >
                {/* ২. স্মুথ রোটেশন অ্যানিমেশন সহ ডায়নামিক আইকন */}
                <div
                  className={cn(
                    "transition-transform duration-300 ease-in-out",
                    mobileMenuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"
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
                        <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                        <AvatarFallback className="text-xs font-semibold">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-foreground">
                          Jane Doe
                        </span>
                        <span className="text-xs text-muted-foreground">
                          jane@acme.com
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
                    const Icon = link.icon;
                    return (
                      <DropdownMenuItem key={link.href}  render={

                        <Link
                          href={link.href}
                          className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer"
                        >
                          <Icon className="size-4 " />
                          <span className="font-semibold text-sm uppercase">
                            {link.label}
                          </span>
                        </Link>
                    }>
                   
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-1.5" />

                {/* User Account & Support Links */}
                {userMenuGroups.map((group, i) => (
                  <div key={i}>
                    <DropdownMenuGroup>
                      {group.map((item) => (
                        <DropdownMenuItem key={item.href}  render={
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer"
                          >
                            <item.icon className="size-4 text-muted-foreground" />
                            <span className="font-medium text-sm">
                              {item.label}
                            </span>
                          </Link>

                            }>
                           
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-1.5" />
                  </div>
                ))}

                {/* Sign Out Button */}
                <DropdownMenuItem
                  variant="destructive"
                  className="flex items-center gap-3 py-2 px-2 rounded-lg cursor-pointer mt-1"
                  onClick={() => console.log("Sign out clicked")}
                >
                  <LogOut className="size-4" />
                  <span className="font-semibold text-sm">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}