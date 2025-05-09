import Card from "./Card";
import "../../styles/CardList.css";

const CardList = ({ items, type, onCardClick }) => {
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];
  if (safeItems.length === 0) {
    return <div className="cardlist__empty">No items found.</div>;
  }
  return (
    <div className="cardlist">
      {safeItems.map((item) => (
        <Card
          key={item.idDrink || item.idIngredient || item.strIngredient1}
          item={item}
          type={type}
          onClick={() => onCardClick && onCardClick(item)}
        />
      ))}
    </div>
  );
};
export default CardList;
