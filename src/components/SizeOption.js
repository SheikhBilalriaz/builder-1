export default function SizeOption({ price, sizeInInches, isSelected, onSelect }) {
    return (
        <div
            className={`size_option ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            <div>
                <div className="size_in_inches">{sizeInInches}"</div>
                <div className="size_price_tag">${price}</div>
            </div>
        </div>
    );
}