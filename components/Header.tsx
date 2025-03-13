import Link from "next/link";

const Header = () => {
    return (
        <div className='header bg-[#312D60] py-[20px]'>
            <div className='container px-6'>
                <div className='row'>
                    <div className='flex justify-between items-center'>
                        <Link className="text-[#fff] lg:text-[24px] md:text-[20px] sm:text-[18px] text-[14px] font-semibold" href="/">Surveylancer CV Builder</Link>
                        <ul className="flex lg:text-[16px] md:text-[15px] sm:text-[14px] text-[12px] text-[#fff] lg:space-x-10 md:space-x-8 sm:space-x-5 space-x-4">
                            <li><Link className="hover:text-[#CE367F]" href="#">Home</Link></li>
                            <li><Link className="hover:text-[#CE367F]" href="#">About</Link></li>
                            <li><Link className="hover:text-[#CE367F]" href="#">Service</Link></li>
                            <li><Link className="hover:text-[#CE367F]" href="#">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;