import Logo from '../assets/Logo.png'
import CustomizedAccordion from '../components/customAccordion';

const FAQ_DETAILS = [{
    name: "What is ACM Cloud?",
    text: <div><div>ACM Cloud is a initative started by UCLA ACM for and by students interested in exploring cloud technologies and 
        distributed systems. ACM Cloud is committed to providing resources to build a strong intuition of the architectural foundations 
        of the modern cloud environment through project-based hands-on experience. Below are some links to our previous events:</div>
        <ul>
            <li>
                Coming soon!
            </li>
        </ul>
        </div>
}, {
    name: "What does this AWS Workshop Series cover?",
    text: <div>Coming Soon!</div>
}, {
    name: "How was this site built?",
    text: <div>Coming Soon!</div>
}]

function Home({ dimensions }) {
    return (
        <div class="home">
            <div class="heroSection">
                <div class="columns">
                    <div class="columnLarge">
                        <h1>FakeBook</h1>
                        <h4 class="paddingTop">Join FakeBook, ACM Cloud's latest app for sharing status, connecting with friends, and meeting new people!</h4>
                    </div>
                    <div class="columnSmall">
                        <img src={Logo} width='200vw' height='200vw'/>
                    </div>
                </div>
            </div>
            <div class="nextSteps">
                <h3 class="paddingBottom">Frequently Asked Questions</h3>
                <CustomizedAccordion data={FAQ_DETAILS} />
            </div>
        </div>
    );
};
  
  export default Home;