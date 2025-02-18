export default function Footer() {
    return (
        <footer className="pt-[80px] pb-[60px] bg-[#312D60] text-white text-center">
            <h5 className="text-[16px] mb-[40px] font-semibold">Surveylancer CV Builder</h5>
            <nav className="flex justify-center space-x-20 mb-[40px] text-[#fff] text-[16px]">
                <a className="hover:text-[#CE367F]" href="#">Home</a>
                <a className="hover:text-[#CE367F]" href="#">About</a>
                <a className="hover:text-[#CE367F]" href="#">Service</a>
                <a className="hover:text-[#CE367F]" href="#">Contact</a>
            </nav>
            <div className="flex justify-center items-center">
                <ul className="flex justify-center items-center space-x-5 mb-[25px]">
                    <li><a className="inline-block w-[40px] h-[40px] rounded-full text-[16px] leading-[38px] bg-[#fff] hover:bg-[#CE367F] text-[#CE367F] hover:text-[#fff] font-bold" href="#">Be</a></li>
                    <li><a className="inline-block w-[40px] h-[40px] rounded-full text-[16px] leading-[38px] bg-[#fff] hover:bg-[#CE367F] text-[#CE367F] hover:text-[#fff] font-bold" href="#">Dr</a></li>
                    <li><a className="inline-block w-[40px] h-[40px] rounded-full text-[16px] leading-[38px] bg-[#fff] hover:bg-[#CE367F] text-[#CE367F] hover:text-[#fff] font-bold" href="#">Ig</a></li>
                    <li><a className="inline-block w-[40px] h-[40px] rounded-full text-[16px] leading-[38px] bg-[#fff] hover:bg-[#CE367F] text-[#CE367F] hover:text-[#fff] font-bold" href="#">Tw</a></li>
                </ul>
            </div>
            <div className="max-w-[1230px] w-[100%] bg-[#fff] h-[2px] m-auto"></div>
            <p className="mt-[30px] text-[#fff]">&copy; 2024 Surveylancer CV Builder</p>
        </footer>
    );
}
