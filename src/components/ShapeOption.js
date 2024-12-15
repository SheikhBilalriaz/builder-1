export default function ShapeOption({ price, name, src, isSelected, onSelect }) {
    return (
        <div
            className={`shape_option ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            <div>
                <img className="shape_img" src={src} alt={name} />
                <div className="shape_name">{name}</div>
                <div className="shape_price">${price}</div>
            </div>
        </div>
    );
}