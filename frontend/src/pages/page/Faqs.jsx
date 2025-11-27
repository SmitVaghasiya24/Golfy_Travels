import Faq from '../../components/Faq';
import BreadcrumbHero from '../../components/Breadcrumb';
import Footer from '../../components/Footer';

function Faqs() {
    return (
        <div>
            <BreadcrumbHero title="Ask & Question" background="/breadcrumb.jpeg" />

            <Faq
                type="home"
                title="General Questions"
                subtitle="We're committed to offering more than just products—we provide exceptional experiences."
            />

            <div
                className="w-full h-[550px] md:h-[750px] bg-cover bg-center bg-no-repeat flex items-center justify-center mt-14 px-4"
                style={{
                    backgroundImage: "url('/pages/faq.jpg')",
                    backgroundAttachment: "fixed"
                }}
            ></div>

            <Faq
                type="faq"
                title="Visa & Documentation"
                subtitle="We're committed to offering more than just products—we provide exceptional experiences."
            />

            <Footer />

        </div>
    )
}

export default Faqs