export default function RootLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32">
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="h-6 w-48 bg-gray-100 rounded-full animate-pulse" />
          </div>
          <div className="flex justify-center">
            <div className="h-12 w-96 bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="flex justify-center">
            <div className="h-5 w-72 bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <div className="h-12 w-36 bg-gray-100 rounded-lg animate-pulse" />
            <div className="h-12 w-36 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-8 space-y-4">
              <div className="w-14 h-14 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-6 w-36 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
              <div className="space-y-2 pt-4">
                <div className="h-3 w-full bg-gray-50 rounded-lg animate-pulse" />
                <div className="h-3 w-full bg-gray-50 rounded-lg animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-50 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
