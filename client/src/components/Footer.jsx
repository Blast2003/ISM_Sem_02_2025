import Blogo1 from '../../public/IT_KMS_logo.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200  dark:text-gray-300  text-gray-900 mt-10">
      {/* Top Call-to-Action */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1 max-w-md">
          <div className="flex items-center mb-4">
            <img src={Blogo1} alt="IT KMS Logo" width={32} height={32} className="mr-2" />
            <span className="dark:text-white text-gray-950 font-semibold text-xl">IT Knowledge Management</span>
          </div>
          <p className="dark:text-gray-400 text-gray-900 mb-2">
            Join our community to get the latest courses, tutorials, and resources delivered straight to your inbox.
          </p>
          <button className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-colors">
            Subscribe Newsletter
          </button>
        </div>
        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-12 gap-y-6 flex-1">
          <div className="flex flex-col space-y-2 text-sm">
            <span className="dark:text-white text-gray-900 font-semibold">Platform</span>
            <a href="#" className="hover:underline">Courses</a>
            <a href="#" className="hover:underline">Instructors</a>
            <a href="#" className="hover:underline">My Progress</a>
            <a href="#" className="hover:underline">Ratings</a>
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="text-white font-semibold">Resources</span>
            <a href="#" className="hover:underline">Videos</a>
            <a href="#" className="hover:underline">Documents</a>
            <a href="#" className="hover:underline">Lectures</a>
            <a href="#" className="hover:underline">Blog</a>
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="text-white font-semibold">Company</span>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">News</a>
          </div>
          <div className="flex flex-col space-y-2 text-sm">
            <span className="text-white font-semibold">Support</span>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">FAQ</a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <span>© 2025 IT Knowledge Management. All rights reserved.</span>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebookF size={16} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
