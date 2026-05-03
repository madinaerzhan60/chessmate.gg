export function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2 text-sm text-[#ff3359]">
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#ff0033] border-t-transparent" />
      Loading...
    </div>
  );
}
