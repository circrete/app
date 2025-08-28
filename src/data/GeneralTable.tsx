import { TableFooter } from '../uicomponents/TableFooter';

export const GeneralTable: React.FC<
  React.ComponentProps<'div'> & { addMethod?: () => void; selectedItemsCount: number }
> = ({ children, addMethod, selectedItemsCount, ...props }) => (
  <div
    className="max-w-screen-2xl mx-auto px-4 pb-4 transition-all duration-400 flex flex-col max-h-[calc(100svh-var(--header-height))] h-[100svh] gap-4"
    {...props}
  >
    <div className="flex-1 w-full flex flex-row">{children}</div>
    <TableFooter addMethod={addMethod} selectedItemsCount={selectedItemsCount} />
  </div>
);
