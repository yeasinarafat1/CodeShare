// app/snippets/loading.tsx
export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-400 font-medium">Fetching snippets...</span>
      </div>
    </div>
  );
}