import IconHeader from "./IconHeader/IconHeader";
import ColHeader from "./ColHeader/ColHeader";

const Header = () => {
    return (
        <div className="row mt-5 align-items-center">
            <IconHeader />
                        
            <ColHeader />
        </div>
    );
};

export default Header;
