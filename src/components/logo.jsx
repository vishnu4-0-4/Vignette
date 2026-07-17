const Logo = ({ width = '40px' }) => {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div
        className="rounded-lg bg-black flex items-center justify-center shrink-0"
        style={{ width, height: width }}
      >
        <span className="text-white font-bold" style={{ fontSize: `calc(${width} * 0.4)` }}>
          B
        </span>
      </div>

      <span className="text-2xl font-bold whitespace-nowrap text-gray-900">
        Blog<span className="text-blue-600">Nest</span>
      </span>
    </div>
  );
};

export default Logo;