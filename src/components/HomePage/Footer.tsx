"use client"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { IoPencil } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 bg-slate-900 shadow-xl ring-2 ring-black/30 pt-16 pb-16 pl-6 pr-6 rounded-2xl">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="mb-5">
                <span className="text-white text-5xl font-normal">FixIt</span>
                <span className="text-primary text-xl font-normal">Now</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              We design spaces that reflect your style and comfort. Our expert decorators bring creativity, quality, and elegance to every home.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-orange-500 transition"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-white text-2xl mb-6">Address</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-orange-500 mt-1 flex-shrink-0"
                />
                <p>
                  Dhaka Bangladesh,
                  <br />
                  CA 90059
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p>+369 458 4739</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <p>fixitnow@services.com</p>
              </div>
              <div className="flex items-center gap-3">
                <IoPencil size={18} className="text-orange-500 flex-shrink-0" />
                <p>Working hours: <br />7/24</p>
              </div>
            </div>
          </div>

          {/* Blogs */}
          <div>
            <h3 className="text-white text-2xl mb-6">Blogs</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Model
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-orange-500 transition">
                  Fixit Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-2xl mb-6">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  FixIt Now
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Portfolio Detail
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-2xl mb-6">
              Newsletter
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 main-btn2"
              >
                Subscribe
                <span className="text-xl">
                  <MdOutlineArrowOutward />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} FixIt Now. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-orange-500 transition">
              Terms And Condition
            </Link>
            <Link href="#" className="hover:text-orange-500 transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;