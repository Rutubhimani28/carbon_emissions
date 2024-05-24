import Footer from './components/footer/footer';
import LandingPage from './components/landingPage/index'
import Header from './components/header/header'

function UserLayout() {
    return (
        <div className="App">
            <Header />
            <LandingPage />
            <Footer />
        </div>
    );
}

export default UserLayout;
