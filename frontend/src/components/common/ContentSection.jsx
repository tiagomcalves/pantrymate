const ContentSection = ({title, w, h, children}) => {

    return (
        <section style={{
            border: "2px solid lightgrey",
            borderStyle: "groove",
            borderRadius: "5px",
            width: w,
            height: h,
            maxWidth: "100%",
            overflow: "hidden"
        }}>

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
                    flex: "wrap",
                    overflowX: "visible",
                    gap: "12px",
                    width: "100%",
                    padding: "0px 15px 5px",
                }}
            >
                {children}
            </div>
        </section>
    )
}
export default ContentSection;