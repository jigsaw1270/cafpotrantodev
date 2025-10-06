import { SubservicesGridSkeleton } from './SubserviceSkeleton';

export function CategoryPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Back Navigation Skeleton */}
      <div className="container mx-auto bg-cyan-100 px-8 pt-6 lg:px-12">
        <div className="mb-4 h-4 w-32 rounded bg-gray-200"></div>
      </div>

      {/* Category Banner Skeleton */}
      <section className="from-background via-cyan to-background relative overflow-hidden bg-gradient-to-br py-16">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Category Content */}
            <div>
              <div className="mb-6 h-10 rounded bg-gray-200 lg:h-12"></div>

              <div className="mb-6 space-y-3">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-4/5 rounded bg-gray-200"></div>
                <div className="h-4 w-3/5 rounded bg-gray-200"></div>
              </div>

              <div className="h-4 w-48 rounded bg-gray-200"></div>
            </div>

            {/* Category Image */}
            <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-xl lg:h-96">
              <div className="h-full w-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Subservices Grid Skeleton */}
      <section className="grad-up-navy py-16">
        <div className="container mx-auto px-8 lg:px-12">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 h-8 w-64 rounded bg-gray-200"></div>
            <div className="mx-auto max-w-2xl space-y-2">
              <div className="h-4 rounded bg-gray-200"></div>
              <div className="mx-auto h-4 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>

          {/* Subservices Grid */}
          <SubservicesGridSkeleton />
        </div>
      </section>
    </div>
  );
}
