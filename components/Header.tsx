import Link from "next/link";

const Header = () => {
    return (
        <div className='header bg-[#312D60] py-[20px]'>
            <div className='container px-6'>
                <div className='row'>
                    <div className='flex justify-between items-center'>
                        <Link className="text-[#fff] text-[24px] font-semibold" href="/">Surveylancer CV Builder</Link>
                        <ul className="flex text-[16px] text-[#fff] space-x-10">
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