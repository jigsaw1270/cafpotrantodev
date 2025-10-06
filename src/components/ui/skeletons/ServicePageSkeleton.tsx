export function ServicePageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Back Navigation Skeleton */}
      <div className="container mx-auto px-8 pt-6 lg:px-12">
        <div className="mb-4 h-4 w-32 rounded bg-gray-200"></div>
      </div>

      {/* Service Header Skeleton */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Service Title & Info */}
              <div className="mb-8">
                <div className="mb-4 h-8 rounded bg-gray-200 lg:h-10"></div>

                {/* Service Meta */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <div className="h-5 w-24 rounded bg-gray-200"></div>
                  <div className="h-5 w-32 rounded bg-gray-200"></div>
                  <div className="h-5 w-28 rounded bg-gray-200"></div>
                </div>
              </div>

              {/* Service Description */}
              <div className="mb-8">
                <div className="mb-4 h-6 w-48 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="h-4 rounded bg-gray-200"></div>
                  <div className="h-4 rounded bg-gray-200"></div>
                  <div className="h-4 w-4/5 rounded bg-gray-200"></div>
                  <div className="h-4 w-3/5 rounded bg-gray-200"></div>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-8">
                <div className="mb-4 h-5 w-32 rounded bg-gray-200"></div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border p-4"
                    >
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="mb-1 h-4 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-3 w-full rounded bg-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Payment Details Card */}
                <div className="rounded-xl border p-6 shadow-sm">
                  <div className="mb-4 h-5 w-40 rounded bg-gray-200"></div>

                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="h-4 w-24 rounded bg-gray-200"></div>
                        <div className="h-4 w-16 rounded bg-gray-200"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Options Card */}
                <div className="rounded-xl border p-6 shadow-sm">
                  <div className="mb-4 h-5 w-36 rounded bg-gray-200"></div>

                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg p-3"
                      >
                        <div className="h-5 w-5 rounded bg-gray-200"></div>
                        <div className="h-4 w-32 rounded bg-gray-200"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="space-y-3">
                  <div className="h-12 rounded bg-gray-200"></div>
                  <div className="h-12 rounded bg-gray-200"></div>
                  <div className="h-12 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
