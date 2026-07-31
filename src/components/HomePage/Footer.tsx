"use client";

import Link from "next/link";
import { Wrench, PhoneCall, Mail, MapPin, ArrowRight } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Top Newsletter / CTA Row */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Need Professional & Emergency Services?
            </h3>
            <p className="text-sm text-slate-400">
              We are available 24/7 to solve all your home and business maintenance issues.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Link
              href="#"
              className="w-full lg:w-auto bg-primary text-white px-8 py-4 rounded-full font-medium shadow-lg hover:opacity-90 transition-all text-center inline-flex items-center justify-center gap-2 group"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Service<span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing top-notch 24/7 maintenance, electrical, plumbing, and professional home solutions with expert care.
            </p>
            {/* Social Icons from react-icons */}
            <div className="flex items-center gap-3 pt-2">
              <Link href="#" className="w-10 h-10 bg-slate-900 hover:bg-primary text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-all">
                <FaFacebookF className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-slate-900 hover:bg-primary text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-all">
                <FaTwitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-slate-900 hover:bg-primary text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-all">
                <FaInstagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-slate-900 hover:bg-primary text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-all">
                <FaLinkedinIn className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg tracking-wide border-l-2 border-primary pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Our Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Service Areas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg tracking-wide border-l-2 border-primary pl-3">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">General Maintenance</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Electrical Care</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Plumbing & Pipe Fit</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Interior & Painting</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">24/7 Emergency Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg tracking-wide border-l-2 border-primary pl-3">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-400">110 Irving St NW First Floor, Washington, DC 20010</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-400">(888) 4567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-400">support@servicepro.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ServicePro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}