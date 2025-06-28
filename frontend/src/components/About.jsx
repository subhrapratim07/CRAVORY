// About.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Nav';
import Footer from './Footer';
const About = () => {
    
  return (
    <>
    <Nav />
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* About Content */}
   <div className="container py-5 text-center">
  <h1 className="mb-4 display-1 fw-semibold text-dark" style={{ fontFamily:"cursive"}}>
    Who Are We?
  </h1>
  <p className="fs-4 text-secondary mx-auto" style={{ maxWidth: '900px', lineHeight: '1.8' }}>
    Welcome to Cravory, where passion meets flavor in every bite. We take pride in offering a 
    delightful dining experience through both our cozy offline restaurant and convenient online ordering service. 
    Whether you’re enjoying a meal in our inviting ambiance or savoring it at home, we bring the same care and quality to every dish.

At Cravory, our menu celebrates the richness of multicuisine offerings — from aromatic Indian spices to 
continental classics and Asian favorites. Our chefs craft each dish with authenticity and creativity to satisfy 
every palate. We’re committed to delivering not just food, but a flavorful journey for our guests — anytime, anywhere.
  </p>
</div>
</div>

<Footer />

</>
  );
};

export default About;
