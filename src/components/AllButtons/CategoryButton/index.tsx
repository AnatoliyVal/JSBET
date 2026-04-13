import {chip, thumb} from "./styles.ts";

interface CategoryButtonProps {
    CategoryName: string;
    isActive?: boolean;
    onClick?: () => void;
}

const CategoryButton = ({CategoryName, isActive = false, onClick}: CategoryButtonProps) => (
    <li>
        <button style={chip(isActive)} type="button" onClick={onClick}>
            <img style={thumb} src={`index-files/categories/${CategoryName}.jpg`} alt="" loading="lazy"/>
            {CategoryName}
        </button>
    </li>
);

export default CategoryButton;
