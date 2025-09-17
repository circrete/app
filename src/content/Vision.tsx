import interior from '../assets/images/iterior-jpg-35.jpg';
import label from '../assets/images/label-jpg-35.jpg';
import rebound from '../assets/images/rebound-jpg-35.jpg';
import circularity from '../assets/images/circularity-jpg-30.jpg';
import concreteRubleTower from '../assets/images/concrete-ruble-tower-jpg-30.jpg';
import rabottorens from '../assets/images/rabottorens-jpg-30.jpg';
import colorfullNonRabot from '../assets/images/colorfullNonRabot-jpg-30.jpg';
import sitePicture from '../assets/images/site-picture-jpg-35.jpg';

export const Vision: React.FC = () => (
  <main>
    <title>Vision</title>
    <header>
      <h1>circrete</h1>
      <h3>Building Tomorrow's Cities with Yesterday's Concrete</h3>
    </header>
    <section className=" flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">
          circrete operates as a consultant for building owners, demolition companies and architects.
        </h3>
        <div className="w-fill flex gap-4 flex-col lg:h-[calc(calc(100%-16px)*.395)] lg:flex-row">
          <img className="lg:w-[calc((100%_-16px)*1.5/2.38)]" src={rabottorens} alt="Interior" />
          <img className="lg:w-[calc((100%_-16px)*.88/2.38)]" src={colorfullNonRabot} alt="Interior" />
        </div>
        <div className="w-full flex gap-4 flex-col lg:flex-row">
          <img
            className="w-[100%] h-[197%] min-w-[500px] lg:max-w-[500px]"
            src={concreteRubleTower}
            alt="Concrete Ruble Tower"
          />
          <div className="w-full flex flex-col justify-between gap-4">
            <div className="w-full flex flex-col gap-4">
              <h3>Potential of structural elements</h3>
              <p>
                Obsolete buildings are often structurally sound before transformation or demolition which usually occurs
                for reasons unrelated to material quality or structural integrity. Concrete structures often undergo
                low-value recycling, being crushed for road bases or backfilling purposes rather than being preserved at
                the element scale and used in a load-bearing context.
              </p>
              <h3>What is structural reuse?</h3>
              <p>
                The load-bearing structure of a building contains up to 80% of the embodied carbon and makes up for up
                to 60% of the mass. Structural concrete reuse involves salvaging and repurposing entire concrete
                elements (such as beams, columns, or slabs) from demolished buildings for use in new construction,
                reducing waste and carbon emissions.
              </p>
            </div>
            <div className="w-full flex flex-row justify-end">
              <img src={circularity} alt="Interior" />
            </div>
          </div>
        </div>
        <img className="w-[100%] h-[61%]" src={interior} alt="Interior" />
        <div className="w-full flex gap-4 flex-col lg:flex-row-reverse">
          <img className="w-[100%] h-[66%] min-w-[500px] lg:max-w-[500px]" src={rebound} alt="Rebound" />
          <div className="flex flex-col gap-2">
            <h3>Non-Destructive Testing</h3>
            <p>
              text that belongs here. text that belongs here. text that belongs here. text that belongs here. text that
              belongs here. text that belongs here. text that belongs here. text that belongs here. text that belongs
              here. text that belongs here. text that belongs here. text that belongs here. text that belongs here. text
              that belongs here. text that belongs here. text that belongs here. text that belongs here. text that
              belongs here. text that belongs here. text that belongs here. text that belongs here.
            </p>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col lg:flex-row">
          <img
            className="flex justify-center w-[100%] h-[66%] min-w-[500px] lg:max-w-[500px]"
            src={label}
            alt="Label"
          />
          <div className="flex flex-col gap-2">
            <h3>Site Inspection</h3>
            <p>
              text that belongs here. text that belongs here. text that belongs here. text that belongs here. text that
              belongs here. text that belongs here. text that belongs here. text that belongs here. text that belongs
              here. text that belongs here. text that belongs here. text that belongs here. text that belongs here. text
              that belongs here. text that belongs here. text that belongs here. text that belongs here. text that
              belongs here. text that belongs here. text that belongs here. text that belongs here.
            </p>
          </div>
        </div>
        <img className="w-[100%] h-[54%]" src={sitePicture} alt="Site Picture" />

        <div className="flex flex-col gap-2">
          <h2>We offer:</h2>
          <ul className="flex flex-col gap-2">
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
