import GeneralView from "../../features/GeneralView.jsx";
import ExpiringBelt from "../../features/Expiring/ExpiringBelt.jsx";
import SuggestionByAI from "../../features/SuggestionByAI.jsx";

const Content = () => {

    // const timeLeftStyle = {
    //     color:"lightskyblue"
    // }

    return (
        <section>
            <GeneralView/>
            <hr/>
            <ExpiringBelt/>
            <hr/>
            <SuggestionByAI/>
            <hr/>
        </section>
    )
}
export default Content;