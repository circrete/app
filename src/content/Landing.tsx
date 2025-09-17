import { Link } from '../uicomponents/Link';

export const Landing: React.FC = () => (
  <main>
    <header>
      <h1>circrete</h1>
      <p className="subtitle">Building Tomorrow's Cities with Yesterday's Concrete</p>
    </header>
    <section className=" flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">
          circrete operates as a consultant for building owners, demolition companies and architects.
        </h3>

        <div className="flex flex-col gap-2">
          <h2>We offer:</h2>
          <ul className="flex flex-col gap-2">
            <Link href="/vision">Vison</Link>
            <li>
              <strong>Initial reuse assessment</strong> (prior to demolition) on-site and via the digital building
              archive
            </li>
            <li>
              <strong>Dismantling plans</strong>
            </li>
            <li>
              <strong>Non-destructive testing</strong> of concrete elements in the donor structure
            </li>
            <li>
              <strong>Labeling of elements</strong> with RFID chips that store information on the element history and
              material quality to facilitate safe reintegration
            </li>
            <li>
              <strong>Showcasing the reclaimed elements</strong> on our platform to find a receiver building
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
);
