export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Back Navigation Skeleton */}
      <div className="container mx-auto px-4 pt-6">
        <div className="h-4 w-64 bg-gray-200 rounded mb-2"></div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2">
              
              {/* Title Skeleton */}
              <div className="mb-8">
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                
                {/* Meta Info Skeleton */}
                <div className="flex gap-4 mb-6">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 w-28 bg-gray-200 rounded"></div>
                </div>

                {/* Price Box Skeleton */}
                <div className="bg-gray-200 rounded-lg p-6 mb-8">
                  <div className="h-8 w-48 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="mb-8">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>

              {/* Features Skeleton */}
              <div className="mb-8">
                <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                
                {/* Payment Card Skeleton */}
                <div className="bg-gray-200 rounded-xl p-6">
                  <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>

                {/* Payment Options Skeleton */}
                <div className="bg-gray-200 rounded-xl p-6">
                  <div className="h-6 w-36 bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-12 bg-gray-300 rounded-lg"></div>
                    ))}
                  </div>
                </div>

                {/* Buttons Skeleton */}
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-12 bg-gray-300 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
