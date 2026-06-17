import Navbar from "../sections/navbar/Navbar";
import Hero from "../sections/hero/Hero";
import Skills from "../sections/skills/Skills";
import Projects from "../sections/projects/Projects";
import Education from "../sections/education/Education";
import Contact from "../sections/contact/Contact";
import Footer from "../sections/footer/Footer";

import ClickSpark from "../components/ClickSpark";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="grid-bg" />

        <Hero />
        {/* <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer /> */}
      </main>
    </>
  );
}
