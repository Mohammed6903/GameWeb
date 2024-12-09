import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PermissionDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Permission Denied
        </h1>

        <Card className="w-full max-w-md bg-gray-50 border-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              Sorry, you don't have permission to access this page. If you believe this is an error, please contact the administrator.
            </p>
            <div className="flex justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Link href="/">
                  Return to Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}