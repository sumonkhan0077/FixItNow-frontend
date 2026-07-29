"use client"

import { useState } from "react"
import Link from "next/link"
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
  Menu,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Primary navigation links — kept in an array for easy maintenance.
const navLinks = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Team", href: "/team", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
]

// User dropdown options — grouped and kept in an array.
const userMenuGroups = [
  [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  [{ label: "Support", href: "/support", icon: LifeBuoy }],
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Acme Inc</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open user menu">
                  <Avatar className="size-8">
                    <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">Jane Doe</span>
                    <span className="text-xs font-normal text-muted-foreground">jane@acme.com</span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {userMenuGroups.map((group, i) => (
                <div key={i}>
                  <DropdownMenuGroup>
                    {group.map((item) => (
                      <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
                        <item.icon data-icon="inline-start" />
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </div>
              ))}
              <DropdownMenuItem variant="destructive" onClick={() => console.log("[v0] Sign out clicked")}>
                <LogOut data-icon="inline-start" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile nav links */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants({ variant: "ghost", size: "default" }), "justify-start")}
            >
              <link.icon data-icon="inline-start" />
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
