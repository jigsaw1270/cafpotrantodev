export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Back Navigation Skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Your Data Section Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
              
              {/* Type Selection Skeleton */}
              <div className="mb-6 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>

              {/* Form Fields Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-12 mb-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="mt-4">
                <div className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-8 mb-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-10 mb-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-14 mb-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Consent Checkboxes Skeleton */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded mt-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded mt-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-72 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Payment Methods Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-4 border rounded-lg">
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Urgency Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-5 bg-gray-200 rounded w-20 mb-4 animate-pulse"></div>
              <div className="flex items-start gap-3">
                <div className="h-4 w-4 bg-gray-200 rounded mt-1 animate-pulse"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Premium Support Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-5 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
              <div className="flex items-start gap-3">
                <div className="h-4 w-4 bg-gray-200 rounded mt-1 animate-pulse"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-40 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-52 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Purchase Summary Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-5 bg-gray-200 rounded w-36 mb-4 animate-pulse"></div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                </div>
                
                <div className="border-t pt-3 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-5 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-14 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
