import interior from '../assets/images/iterior-jpg-35.jpg';
import label from '../assets/images/label-jpg-35.jpg';
import rebound from '../assets/images/rebound-jpg-35.jpg';
import circularity from '../assets/images/circularity-jpg-30.jpg';
import concreteRubleTower from '../assets/images/concrete-ruble-tower-jpg-30.jpg';
import rabottorens from '../assets/images/rabottorens-jpg-30.jpg';
import colorfullNonRabot from '../assets/images/colorfullNonRabot-jpg-30.jpg';
import sitePicture from '../assets/images/site-picture-jpg-35.jpg';
import planData from '../assets/images/plan-data-crop-jpg-30.jpg';

export const Vision: React.FC = () => (
  <main>
    <title>Vision</title>
    <header className="pb-4">
      <h1>circrete</h1>
      <h3>Building Tomorrow's Cities with Yesterday's Concrete</h3>
    </header>
    <section className=" flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        <p>
          Concrete is a very versatile and durable material. Durable and easy to shape into any form it gave form to
          much of our modern buildings and infrastructure. It is made by mixing stones (known as aggregates) with cement
          and water. Just like stone, concrete is rather brittle. To allow it to be used in a load-bearing context, it
          is reinforced with steel bars.
        </p>
        <div className="flex flex-col gap-4">
          <p>
            As frequently as concrete is used, the cement industry is the single largest source of CO2 emissions.
            Concrete is the single largest consumer of cement, making it the one of the materials emitting the most CO2.
            Right now most concrete is crushed and at best has it aggregates recycled, but more likely ends up being
            used as road base or backfill. In some cases it might just even be disposed of in a landfill.
          </p>
          <span className="text-bold">We want to change that.</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Selective Demolition</h3>
        <p>
          As pretty as a structure might look like after it has been stripped of most of the achitectural features,
          images of an ongoing demolition rather invoke images of akin to a warzone. It's an energy intensive process
          that is also quite dangerous.
        </p>
        <div className="w-fill flex gap-4 flex-col lg:h-[calc(calc(100%-16px)*.395)] lg:flex-row">
          <img className="lg:w-[calc((100%_-16px)*1.5/2.38)]" src={rabottorens} alt="Interior" />
          <img className="lg:w-[calc((100%_-16px)*.88/2.38)]" src={colorfullNonRabot} alt="Interior" />
        </div>
        <h1>Structural Reuse</h1>
        <div className="w-full flex gap-4 flex-col lg:flex-row">
          <img className="w-[100%] h-[197%] lg:w-[500px]" src={concreteRubleTower} alt="Concrete Ruble Tower" />
          <div className="w-full flex flex-col justify-between gap-4">
            <div className="w-full flex flex-col gap-4">
              <h3>Potential of Structural Elements</h3>
              <p>
                Obsolete buildings are often structurally sound before transformation or demolition which usually occurs
                for reasons unrelated to material quality or structural integrity. Concrete structures often undergo
                low-value recycling, being crushed for road bases or backfilling purposes rather than being preserved at
                the element scale and used in a load-bearing context.
              </p>
              <h3>What Is Structural Reuse?</h3>
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
        <h1>Process</h1>
        <img className="w-[100%] h-[61%]" src={interior} alt="Interior" />
        <div className="w-full flex gap-4 flex-col lg:flex-row-reverse">
          <img className="flex justify-center w-[100%] h-[66%] lg:w-[500px]" src={planData} alt="Label" />
          <div className="flex flex-col gap-2">
            <h3>Archive Work</h3>
            <p>
              Before any physical work begins on-site, we thoroughly review all available architectural and structural
              plan data related to the building. This includes examining drawings, blueprints, and any relevant
              documentation found in historical archives. Based on this information, we compile a detailed inventory of
              all the structural and architectural elements present in the building. This preparatory step ensures that
              we have a comprehensive understanding of the building's original design and composition, allowing us to
              plan our assessment and intervention strategies with greater accuracy and efficiency.
            </p>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col lg:flex-row">
          <img className="flex justify-center w-[100%] h-[66%] lg:w-[500px]" src={label} alt="Label" />
          <div className="flex flex-col gap-2">
            <h3>Site Inspection</h3>
            <p>
              Non-destructive tests are applied to each individual element to ensure structural integrity without
              causing any damage. Among these, the rebound test is used to assess surface hardness; this method provides
              valuable insight into the material's strength and elasticity while preserving its original state. In
              addition, chemical reactivity tests are performed to evaluate how the elements respond to various
              environmental and chemical exposures, ensuring long-term durability. Ultrasonic tests are also carried
              out, allowing for the detection of internal flaws or inconsistencies through high-frequency sound waves,
              further contributing to a comprehensive assessment of each element's condition.
            </p>
          </div>
        </div>
        <div className="w-full flex gap-4 flex-col lg:flex-row-reverse">
          <img className="w-[100%] h-[66%] lg:w-[500px]" src={rebound} alt="Rebound" />
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
