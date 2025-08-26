export const ChipWrapper: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) =>
  children ? (
    onClick ? (
      <a
        onClick={onClick}
        className="text-sm text-slate-50 font-medium bg-slate-500 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
      >
        {children}
      </a>
    ) : (
      <span onClick={onClick} className="text-sm font-medium bg-slate-300 px-2 py-1 rounded-lg">
        {children}
      </span>
    )
  ) : (
    <span className="text-sm text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-lg">missing</span>
  );
