export default function ProductOption({ price, name, src, isSelected, onSelect }) {
    return (
        <div
            className={`background_option ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            <div>
                {src != null && <img className="background_img" src={src} alt={name} />}
                <div className="background_name">{name}</div>
                {price > 0 && <div className="background_price">${price}</div>}
            </div>
        </div>
    );
}