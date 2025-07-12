"use client"
import { Card, CardContent } from "../ui/card"
import { Home, Search, FileQuestion, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
            <FileQuestion className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-gray-200">404</h1>
            <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Oops! The page you're looking for seems to have been converted into something else.
            </p>
          </div>
        </div>

        {/* Suggestions Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-xl font-semibold">What would you like to do?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/" className="group">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Home className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Go Home</h4>
                      <p className="text-sm text-gray-600">Return to homepage</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/api-docs" className="group">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Search className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900">Browse API Docs</h4>
                      <p className="text-sm text-gray-600">Explore our documentation</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="space-y-2 text-sm text-gray-500">
          <p>Still can't find what you're looking for?</p>
          <p>
            <a href="mailto:hello@universalconverter.dev" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our support team
            </a>{" "}
            and we'll help you out.
          </p>
        </div>
      </div>
    </div>
  )
}
