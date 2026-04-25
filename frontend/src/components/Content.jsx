import GeneralView from "./content/GeneralView.jsx";
import ExpiringSoon from "./content/ExpiringSoon.jsx";
import SuggestionByAI from "./content/SuggestionByAI.jsx";

const Content = () => {

    // const timeLeftStyle = {
    //     color:"lightskyblue"
    // }

    return (
        <section>
            <GeneralView/>
            <hr/>
            <ExpiringSoon/>
            <hr/>
            <SuggestionByAI/>
            <hr/>
        </section>
    )
}
export default Content;