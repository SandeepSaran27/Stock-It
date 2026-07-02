import NavBar from '../extraComponents/NavBarFolder/NavBar'; 
import StockItFooter from '../extraComponents/FooterFolder/Footer'; 
import { Link } from 'react-router-dom'; 
function About() {
    return (
        <>
            <header>
                <NavBar />
            </header>


            <footer>
                <StockItFooter />
            </footer>
        </>
    );
} 
export default About