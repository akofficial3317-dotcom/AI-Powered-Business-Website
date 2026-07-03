"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Calendar,
  ClipboardList,
  Image,
  Star,
  Settings,
  LogOut,
  KeyRound,
  Mail,
  Menu,
  X,
  ChevronRight,
  Bot,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Events", href: "/admin/events", icon: Calendar },
  {
    name: "Event Registrations",
    href: "/admin/event-registrations",
    icon: ClipboardList,
  },
  { name: "Gallery", href: "/admin/gallery", icon: Image },
  { name: "Feedback", href: "/admin/feedback", icon: Star },
  { name: "Chat History", href: "/admin/chat-history", icon: Bot },
  { name: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Change Password", href: "/change-password", icon: KeyRound },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        cache: "no-store",
      });

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      const currentUser = data.user;

      if (currentUser.role?.toLowerCase() !== "admin") {
        router.push("/");
        return;
      }

      setUser(currentUser);
    } catch {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden flex-col border-r bg-card transition-all duration-300 lg:flex",
          sidebarOpen ? "w-64" : "w-20",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Nexa Admin</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            <ChevronRight
              className={cn(
                "h-5 w-5 transition-transform",
                sidebarOpen && "rotate-180",
              )}
            />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <div
            className={cn(
              "flex items-center gap-3",
              !sidebarOpen && "justify-center",
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn(
              "mt-3 w-full justify-start gap-3",
              !sidebarOpen && "justify-center px-0",
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b px-4">
                <Link href="/admin" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-foreground">Nexa Admin</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 space-y-1 p-4">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="mt-3 w-full justify-start gap-3"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20",
        )}
      >
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 lg:hidden">
          <div className="flex min-w-0 items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/admin" className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="truncate font-bold text-foreground">Nexa Admin</span>
            </Link>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 gap-2">
            <Link href="/">
              <ExternalLink className="h-4 w-4" />
              <span>Visit Site</span>
            </Link>
          </Button>
        </header>

        {/* Desktop Header */}
        <header className="sticky top-0 z-40 hidden h-16 items-center justify-end border-b bg-card px-8 lg:flex">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ExternalLink className="h-4 w-4" />
              <span>Visit Site</span>
            </Link>
          </Button>
        </header>

        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
