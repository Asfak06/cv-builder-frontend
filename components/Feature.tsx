import Image from "next/image";

const Feature = () => {
    return (
        <div className="pt-[80px] pb-[100px] bg-[#fff]">
            <div className="container">
                <div className="row">
                    <div className="text-center pb-[80px]">
                        <h1 className="lg:text-[60px] md:text-[55px] sm:text-[50px] text-[35px] uppercase mb-[20px] leading-[1] font-bold text-[#CE367F]">
                            Create a Professional CV
                        </h1>
                        <h5 className="text-[#312D60] lg:text-[24px] md:text-[22px] sm:text-[21px] text-[18px] font-semibold uppercase mt-[5px]">
                            in Minutes with AI-Powered Precision
                        </h5>
                        <p className="mt-4 text-lg text-[#646161] max-w-3xl mx-auto">
                            Craft the perfect CV that lands you interviews. Our AI-driven CV builder helps you create a tailored, ATS-friendly resume in just a few clicks.
                        </p>
                    </div>

                    <div className="lg:flex md:flex sm:block justify-between items-center gap-6 max-w-[1000px] w-full m-auto">
                        <div className="lg:w-[33.3333%] md:w-[33.3333%] sm:w-full cursor-pointer rounded-xl text-center p-[20px] bg-white hover:shadow-[0px_32px_64px_-12px_#55698721] transition-shadow duration-300">
                            <Image className='m-auto'
                                src="/cv_Icon_1.png"
                                alt="Team Collaboration"
                                width={80}
                                height={80}
                            />
                            <h5 className="text-xl text-[24px] font-extrabold mt-4 text-[#312D60]">
                                Share team inboxes
                            </h5>
                            <p className="text-[#68769F] text-[16px] font-medium mt-2">
                                Whether you have a team of 2 or 200, our shared team inboxes keep
                                everyone
                            </p>
                        </div>


                        <div className="lg:w-[33.3333%] md:w-[33.3333%] sm:w-full cursor-pointer rounded-xl text-center p-[20px] bg-white hover:shadow-[0px_32px_64px_-12px_#55698721] transition-shadow duration-300">
                            <Image className='m-auto'
                                src="/cv_Icon_2.png"
                                alt="AI-Powered Resumes"
                                width={80}
                                height={80}
                            />
                            <h5 className="text-xl text-[24px] font-extrabold mt-4 text-[#312D60]">
                                AI-Powered Precision
                            </h5>
                            <p className="text-[#68769F] text-[16px] font-medium mt-2">
                                Whether you have a team of 2 or 200, our shared team inboxes keep
                                everyone
                            </p>
                        </div>
                        <div className="lg:w-[33.3333%] md:w-[33.3333%] sm:w-full cursor-pointer rounded-xl text-center p-[20px] bg-white hover:shadow-[0px_32px_64px_-12px_#55698721] transition-shadow duration-300">
                            <Image className='m-auto'
                                src="/cv_Icon_3.png"
                                alt="Easy Customization"
                                width={80}
                                height={80}
                            />
                            <h5 className="text-xl text-[24px] font-extrabold mt-4 text-[#312D60]">
                                Easy Customization
                            </h5>
                            <p className="text-[#68769F] text-[16px] font-medium mt-2">
                                Whether you have a team of 2 or 200, our shared team inboxes keep
                                everyone
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
