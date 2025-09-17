import { Link } from '../uicomponents/Link';

export const Landing: React.FC = () => (
  <main>
    <header className="pb-8">
      <h1>circrete</h1>
      <h3 className="subtitle">Building Tomorrow's Cities with Yesterday's Concrete</h3>
    </header>
    <section className=" flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <p>circrete operates as a consultant for building owners, demolition companies and architects.</p>

        <div className="flex flex-col gap-4">
          <Link href="/vision" className="font-bold text-lg hover:text-slate-500 transition-colors cursor-pointer">
            Vison
          </Link>
          <Link href="/aec-flow" className="font-bold text-lg hover:text-slate-500 transition-colors cursor-pointer">
            App History: Aec-Flow
          </Link>
        </div>
      </div>
    </section>
  </main>
);
