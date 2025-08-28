export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Back Navigation Skeleton */}
      <div className="container mx-auto px-8 lg:px-12 pt-6">
        <div className="h-6 w-32 bg-muted rounded"></div>
      </div>

      {/* Banner Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content Skeleton */}
            <div>
              <div className="h-12 bg-muted rounded mb-6"></div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
              <div className="h-6 w-40 bg-muted rounded"></div>
            </div>

            {/* Image Skeleton */}
            <div className="h-80 lg:h-96 bg-muted rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-8 lg:px-12">
          
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-muted rounded mx-auto"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-xl p-6">
                <div className="h-6 bg-secondary rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-secondary rounded"></div>
                  <div className="h-3 bg-secondary rounded"></div>
                  <div className="h-3 bg-secondary rounded w-2/3"></div>
                </div>
                <div className="h-6 bg-secondary rounded mb-3"></div>
                <div className="h-3 bg-secondary rounded mb-6"></div>
                <div className="h-8 bg-secondary rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
