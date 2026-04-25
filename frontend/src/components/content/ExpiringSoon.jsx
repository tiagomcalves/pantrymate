import ExpiringItemCard from "./ExpiringItemCard.jsx";

const ExpiringSoon = () => {
    return (
        <>
            <h5>Consumir Brevemente</h5>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "10px",
                padding: "10px",
                maxWidth: "auto"
              }}
            >
                <ExpiringItemCard name="chicken breasts" image="test" daysLeft={1}/>
                <ExpiringItemCard name="cheese" image="test" daysLeft={2}/>
                  {[1, 2, 3, 4, 5].map((i) => (
                      <ExpiringItemCard name={"item" + i} image="test" daysLeft={i}/>
                    ))}
            </div>
        </>
    )
}
export default ExpiringSoon;