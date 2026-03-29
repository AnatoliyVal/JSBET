import { buttonStyle, imageStyle } from "./GameCategoryButtonStyle.ts";

const CategoryButton = ({CategoryName}: {CategoryName: string}) => {

    return (
        <li>
            <button style={buttonStyle} type="button">
                <img style={imageStyle} src={`index-files/categories/${CategoryName}.jpg`} alt="" loading="lazy" />
                {CategoryName}
            </button>
        </li>
    );
};

export default CategoryButton;
