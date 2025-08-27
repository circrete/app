export const Drawer: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ isOpen, children }) => {
  return (
    <div
      style={{
        maxWidth: isOpen ? 400 : 0,
        opacity: isOpen ? 1 : 0,
        background: 'white',
        marginLeft: isOpen ? 16 : 0
      }}
      className="flex items-center justify-center bg-opacity-50 transition-all rounded-lg text-slate-900 duration-400 h-full"
    >
      {children}
    </div>
  );
};
