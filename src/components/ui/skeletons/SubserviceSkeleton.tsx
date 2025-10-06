export function SubserviceCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Image skeleton */}
        <div className="h-32 bg-gray-200"></div>

        <div className="p-4">
          {/* Title skeleton */}
          <div className="mb-2 h-5 rounded bg-gray-200"></div>

          {/* Description skeleton */}
          <div className="mb-3 space-y-2">
            <div className="h-3 rounded bg-gray-200"></div>
            <div className="h-3 w-5/6 rounded bg-gray-200"></div>
          </div>

          {/* Price skeleton */}
          <div className="mb-3 h-4 w-1/3 rounded bg-gray-200"></div>

          {/* Rating skeleton */}
          <div className="mb-3 flex items-center space-x-1">
            <div className="h-4 w-4 rounded bg-gray-200"></div>
            <div className="h-3 w-12 rounded bg-gray-200"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-8 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export function SubservicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <SubserviceCardSkeleton key={index} />
      ))}
    </div>
  );
}
