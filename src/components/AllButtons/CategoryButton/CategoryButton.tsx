import { buttonStyle, imageStyle } from "./GameCategoryButtonStyle";

interface CategoryButtonProps {
    CategoryName: string;
    isActive?: boolean;
    onClick?: () => void;
}

const CategoryButton = ({ CategoryName, isActive, onClick }: CategoryButtonProps) => {

    return (
        <li>
            <button 
                className={`category-chip ${isActive ? "active" : ""}`}
                style={isActive ? undefined : buttonStyle} 
                type="button"
                onClick={onClick}
            >
                <img style={imageStyle} src={`index-files/categories/${CategoryName}.jpg`} alt="" loading="lazy" />
                {CategoryName}
            </button>
        </li>
    );
};

export default CategoryButton;
