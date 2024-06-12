import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400 py-8 px-4 md:px-6 lg:px-8 my-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link className="flex items-center" href="#">
            <Image
              src="/miginfo_logo_white.png"
              alt="Miginfo white logo"
              width={64}
              height={64}
            />
          </Link>
        </div>
        {/* <nav className="flex space-x-4 md:space-x-6">
          <Link className="hover:text-gray-300 transition-colors" href="#">
            Home
          </Link>
          <Link className="hover:text-gray-300 transition-colors" href="#">
            About
          </Link>
          <Link className="hover:text-gray-300 transition-colors" href="#">
            Services
          </Link>
          <Link className="hover:text-gray-300 transition-colors" href="#">
            Contact
          </Link>
        </nav> */}
        <p className="text-sm mt-4 md:mt-0 text-white">
          © 2024 Acme Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
