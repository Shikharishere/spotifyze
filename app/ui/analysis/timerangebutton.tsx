export default function TimeRangeButton({ range, current, onClick }: { range: string, current: string, onClick: () => void }) {
  const isActive = range === current
  return (
    <button
      onClick={onClick}
      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
        isActive
          ? 'bg-[#1DB954] text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {range === 'short_term' ? '1W' : range === 'medium_term' ? '6M' : 'All'}
    </button>
  )
}