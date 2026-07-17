import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo'

function Footer() {
  return (
    <footer className="relative overflow-hidden py-12 bg-gray-50 border-t border-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Copyright. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Features
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Account
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Help
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer