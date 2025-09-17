export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }> = ({
  href,
  children,
  ...props
}) => {
  return (
    <a onClick={() => (window.location.hash = href)} {...props}>
      {children}
    </a>
  );
};
