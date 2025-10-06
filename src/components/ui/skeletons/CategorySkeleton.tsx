export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200"></div>

        <div className="p-6">
          {/* Title skeleton */}
          <div className="mb-3 h-6 rounded bg-gray-200"></div>

          {/* Description skeleton */}
          <div className="mb-4 space-y-2">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          </div>

          {/* Service count skeleton */}
          <div className="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>

          {/* Button skeleton */}
          <div className="h-10 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
