
const Header = () => {
    return (
        <div className='header bg-[#312D60] py-[20px]'>
            <div className='container px-6'>
                <div className='row'>
                    <div className='flex justify-between items-center'>
                        <a className="text-[#fff] text-[24px] font-semibold" href="/">Surveylancer CV Builder</a>
                        <ul className="flex text-[16px] text-[#fff] space-x-10">
                            <li><a className="hover:text-[#CE367F]" href="#">Home</a></li>
                            <li><a className="hover:text-[#CE367F]" href="#">About</a></li>
                            <li><a className="hover:text-[#CE367F]" href="#">Service</a></li>
                            <li><a className="hover:text-[#CE367F]" href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;