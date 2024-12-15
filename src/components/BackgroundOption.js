export default function BackgroundOptions({ price, name, src, isSelected, onSelect }) {
    return (
        <div
            className={`background_option ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            <div>
                <img className="background_img" src={src} alt={name} />
                <div className="background_name">{name}</div>
                <div className="background_price">${price}</div>
            </div>
        </div>
    );
}