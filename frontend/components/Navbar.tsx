"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, BarChart3, Info, FileText } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Prediction", href: "/prediction", icon: Activity },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "About", href: "/about", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CardioPredict AI
              </h1>
              <p className="text-xs text-gray-500 font-medium">Healthcare Intelligence</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link
            href="/prediction"
            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Activity className="w-4 h-4" />
            Get Prediction
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-700 bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
