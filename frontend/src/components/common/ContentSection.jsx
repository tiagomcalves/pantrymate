const ContentSection = ({title, w, h, children}) => {

    return (
        <section style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "14px",
            boxShadow: "0 2px 16px rgba(0, 0, 0, 0.10)",
            width: w,
            height: h,
            maxWidth: "100%",
            overflow: "hidden"
        }}>

            <h5 style={{
                textAlign: "left",
                paddingLeft: "20px",
                paddingTop: "16px",
                fontWeight: "650",
                color: "#1a1a2e"
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