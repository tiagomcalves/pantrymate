
const ContentSection = ({ title, w, h, children}) => {

    return (
        <section style={ {
            border: "2px solid lightgrey",
            borderStyle: "groove",
            borderRadius: "5px" } }>

            <h5 style={{
                textAlign: "left",
                paddingLeft: "20px",
                paddingTop: "20px",
                fontWeight: "550"   // 400 = normal, 700 = bold
            }}>
                {title}
            </h5>

            <div
                style={{
                    display: "flex",
                    overflowX: "hidden",
                    gap: "12px",
                    padding: "0px 15px 5px",
                    maxWidth: { w } + "px",
                    maxHeight: { h } + "px",
                }}
            >
                { children }
            </div>
        </section>
    )
}
export default ContentSection;