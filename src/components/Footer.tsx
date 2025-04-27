
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-bennett-orange">Bennett<span className="text-bennett-green">Eats</span></span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Delivering delicious food from campus outlets directly to your hostel.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Campus Outlets</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/outlet/kathi" className="text-sm text-gray-600 hover:text-bennett-orange">
                  Kathi Junction
                </Link>
              </li>
              <li>
                <Link to="/outlet/southern" className="text-sm text-gray-600 hover:text-bennett-orange">
                  Southern Stories
                </Link>
              </li>
              <li>
                <Link to="/outlet/maggi" className="text-sm text-gray-600 hover:text-bennett-orange">
                  Maggi Point
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Delivery</h3>
            <p className="text-sm text-gray-600 mb-2">
              We deliver to hostel blocks C1 to C12.
            </p>
            <p className="text-sm text-gray-600">
              Delivery Hours: 8:00 AM - 10:00 PM
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} BennettEats. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-bennett-orange">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-bennett-orange">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-bennett-orange">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
