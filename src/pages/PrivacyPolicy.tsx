import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container-custom mx-auto section-padding text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">Privacy</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground font-medium">
              Last Updated: November 15, 2023
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="space-y-12">
              {/* What Information We are Taking */}
              <div>
                <h2 className="text-4xl font-bold text-black mb-4">
                  What Information We are Taking
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Lorem et purus enim velit sed vel laoreet enim non. Eros ultrices ut risus quisque curabitur aliquet eget nascetur tincidunt. Iaculis curabitur tempor maecenas sit. Cras eu enim leo sit eu quis quis ullamcorper. Bibendum quam consectetur et suspendisse duis aliquam cras. Aliquet in malesuada quis augue turpis fringilla iaculis quam pretium. Nulla id non eu non vel donec. Scelerisque tellus praesent suspendisse egestas at scelerisque. Leo at semper gravida sit leo odio.
                  </p>
                  <p>
                    Nibh hac dolor odio in curabitur. Cursus ornare id elit cras dolor. Tincidunt sed quisque sed enim nulla metus. Dui porttitor scelerisque ullamcorper id praesent semper platea nisi. Id ullamcorper vehicula velit egestas id. Tristique arcu facilisi ipsum arcu fermentum tellus. Facilisi augue orci dolor id sit. Aliquam auctor interdum turpis sit ut viverra id nullam. Lobortis mauris neque elit massa a. Nibh pharetra bibendum fermentum consectetur pharetra volutpat eu amet.
                  </p>
                </div>
              </div>

              {/* How We Use Your Informations */}
              <div>
                <h2 className="text-4xl font-bold text-black mb-4">
                  How We Use Your Informations
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Lorem et purus enim velit sed vel laoreet enim non. Eros ultrices ut risus quisque curabitur aliquet eget nascetur tincidunt. Iaculis curabitur tempor maecenas sit. Cras eu enim leo sit eu quis quis ullamcorper. Bibendum quam consectetur et suspendisse duis aliquam cras. Aliquet in malesuada quis augue turpis fringilla iaculis quam pretium. Nulla id non eu non vel donec. Scelerisque tellus praesent suspendisse egestas at scelerisque. Leo at semper gravida sit leo odio.
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Some legal item</li>
                    <li>Some another legal item</li>
                    <li>Last legal item</li>
                  </ul>
                </div>
              </div>

              {/* Cookies and Tracking */}
              <div>
                <h2 className="text-4xl font-bold text-black mb-4">
                  Cookies and Tracking
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Lorem et purus enim velit sed vel laoreet enim non. Eros ultrices ut risus quisque curabitur aliquet eget nascetur tincidunt. Iaculis curabitur tempor maecenas sit. Cras eu enim leo sit eu quis quis ullamcorper. Bibendum quam consectetur et suspendisse duis aliquam cras. Aliquet in malesuada quis augue turpis fringilla iaculis quam pretium. Nulla id non eu non vel donec. Scelerisque tellus praesent suspendisse egestas at scelerisque. Leo at semper gravida sit leo odio.
                  </p>
                  <p>
                    Nibh hac dolor odio in curabitur. Cursus ornare id elit cras dolor. Tincidunt sed quisque sed enim nulla metus. Dui porttitor scelerisque ullamcorper id praesent semper platea nisi. Id ullamcorper vehicula velit egestas id. Tristique arcu facilisi ipsum arcu fermentum tellus. Facilisi augue orci dolor id sit. Aliquam auctor interdum turpis sit ut viverra id nullam. Lobortis mauris neque elit massa a. Nibh pharetra bibendum fermentum consectetur pharetra volutpat eu amet.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-4xl font-bold text-black mb-4">
                  Your Rights
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Lorem et purus enim velit sed vel laoreet enim non. Eros ultrices ut risus quisque curabitur aliquet eget nascetur tincidunt. Iaculis curabitur tempor maecenas sit. Cras eu enim leo sit eu quis quis ullamcorper. Bibendum quam consectetur et suspendisse duis aliquam cras. Aliquet in malesuada quis augue turpis fringilla iaculis quam pretium. Nulla id non eu non vel donec. Scelerisque tellus praesent suspendisse egestas at scelerisque. Leo at semper gravida sit leo odio.
                  </p>
                </div>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="text-4xl font-bold text-black mb-4">
                  Contact Us
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring interoperable internal or "organic" sources.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
