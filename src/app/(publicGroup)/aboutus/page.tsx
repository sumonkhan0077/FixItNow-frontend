import AboutSection from '@/components/HomePage/AboutSection';
import QuestionAnswer from "@/components/HomePage/QuestionSection";
import ServiceProcess from "@/components/HomePage/ServiceProcess";
import ChooseUs from "@/components/HomePage/ChooseUs";


const AboutPage = () => {
    return (
        <div>
            <AboutSection></AboutSection>
            <ServiceProcess></ServiceProcess>
            <QuestionAnswer></QuestionAnswer>
            <ChooseUs></ChooseUs>
        </div>
    );
};

export default AboutPage;