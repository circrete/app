export const GeneralTable: React.FC<React.ComponentProps<'div'>> = ({ ...props }) => (
  <div
    className="max-w-screen-2xl mx-auto px-4 pb-4 overflow-hidden transition-all duration-400 flex flex-row max-h-[calc(100svh-var(--header-height))] h-[100svh]"
    {...props}
  />
);
