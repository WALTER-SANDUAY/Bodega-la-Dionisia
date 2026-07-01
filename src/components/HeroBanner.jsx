import heroImage from '../Finca la Dionicia fotos/00be0c61-d090-4a9e-b90f-b7e04b3725f8.jpg';
import './HeroBanner.css';

function HeroBanner() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero_overlay" />
      <div className="hero_content">
        <p className="hero_tag">Bodega artesanal</p>
        <h1 className="hero_title">Finca la Dionisia</h1>
        <p className="hero_subtitle">
          Descubre nuestra selección de vinos y licores de alta calidad
        </p>
        <div className="hero_actions">
            <a href="#vinos" className="hero_cta hero_cta--primary">Explorar vinos</a>
            <a href="#galeria" className="hero_cta hero_cta--outline">Nuestros Vinos</a>
        </div>
      </div>
      <div className="hero_bottom" />
    </section>
  );
}

export default HeroBanner;
