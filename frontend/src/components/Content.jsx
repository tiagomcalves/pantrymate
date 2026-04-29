import GeneralView from "./content/GeneralView.jsx";
import ExpiringSoon from "./content/ExpiringSoon.jsx";
import SuggestionByAI from "./content/SuggestionByAI.jsx";
import ListaCompras from "./ListaCompras.jsx";
import ActionButtons from "./ActionButtons.jsx";

const Content = () => {
    return (
        <section>
            <ActionButtons />
            <hr />
            <GeneralView />
            <hr />
            <ExpiringSoon />
            <hr />
            <ListaCompras />
            <hr />
            <SuggestionByAI />
            <hr />
        </section>
    );
};

export default Content;
