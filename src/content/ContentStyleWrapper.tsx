export const ContentStyleWrapper: React.FC<React.ComponentProps<'div'>> = ({ children }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="p-4 overflow-hidden rounded-lg bg-slate-800">{children}</div>
    </div>
  );
};
