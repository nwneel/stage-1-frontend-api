import "./About.css";
import StoreLogo from "../StoreLogo/StoreLogo";

function About() {
  return (
    <div className="about__page">
      <main className="about">
        <StoreLogo />
        <h1 className="about__title">About Us</h1>
        <p className="about__description">
          Nate's Books, Games, Toys, and Hobby Store operates as a unique retail
          destination dedicated to serving a diverse community of passionate
          collectors and casual hobbyists alike. Rather than functioning merely
          as a traditional store, the establishment acts as a specialized
          community hub that actively connects like-minded enthusiasts through
          its carefully curated inventory. This diverse selection features
          distinctive books, an engaging variety of games and toys, and
          specialized hobby merchandise designed to cater to both niche
          interests and dedicated lifelong pursuits. By providing these unique
          and hard-to-find items under one roof, Nate's successfully cultivates
          an inviting environment where individuals can not only discover rare
          additions to their personal collections but also bond over their
          shared interests with a broader network of fellow aficionados.
        </p>
      </main>
    </div>
  );
}

export default About;
