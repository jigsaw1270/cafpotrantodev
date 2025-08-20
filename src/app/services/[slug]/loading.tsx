export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Back Navigation Skeleton */}
      <div className="container mx-auto px-4 pt-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Banner Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content Skeleton */}
            <div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
            </div>

            {/* Image Skeleton */}
            <div className="h-80 lg:h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-6">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-3 bg-gray-300 rounded mb-6"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
