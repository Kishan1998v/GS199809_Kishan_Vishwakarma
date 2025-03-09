export default function Loader({size=4,thickness=2}: {size?: number, thickness?: number}) {
  return (
      <div
          className={`inline-block bg-blue-700 animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] 
                h-${size} w-${size} border-${thickness}`}
          role="status"
      >
        <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
        </svg>
      </div>
  );
}