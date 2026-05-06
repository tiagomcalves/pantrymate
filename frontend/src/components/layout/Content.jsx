import GeneralView from "../../features/GeneralView.jsx";
import CarrosselConsumir from "../../features/Expiring/CarrosselConsumir.jsx";
import SuggestionByAI from "../../features/SuggestionByAI.jsx";

const Content = () => {

    // const timeLeftStyle = {
    //     color:"lightskyblue"
    // }

    return (
        <section>
            <GeneralView/>
            <hr/>
            <CarrosselConsumir/>
            <hr/>
            <SuggestionByAI/>
            <hr/>
        </section>
    )
}
export default Content;