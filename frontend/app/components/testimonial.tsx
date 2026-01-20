import { testimonials } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong, FaRegStar, FaStar } from "react-icons/fa6";
const Testimonials = () => {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-center py-20 md:py-28">
      <div className="w-[90%] flex flex-col md:flex-row gap-20 items-center justify-center">
        <div className="flex flex-col gap-4 items-start ">
          <h2 className="md:text-[30px] text-[20px] text-black font-bold">
            Stories from Mune Pet Parents
          </h2>
          <p className="text-[14px] md:text-[18px] text-black font-light">
            Join thousands of Kenyans who are giving their pets the best care
            possible.
          </p>
          <Link
            href="/login"
            className="flex flex-row gap-2 items-center justify-center text-primary font-extrabold"
          >
            <p>Get Started</p>
            <span>
              <FaArrowRightLong />
            </span>
          </Link>
        </div>
        <ul className="flex flex-col md:flex-row gap-4 justify-evenly">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.name}
              className="flex flex-col gap-4 border-2 rounded-lg p-6"
            >
              <div className="flex flex-row gap-4 items-center justify-start">
                <div>
                  <Image
                    src={testimonial.img}
                    className="object-cover w-20 h-20 rounded-full"
                    alt="Testimonial Image"
                  />
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-black">
                    {testimonial.name}
                  </h3>
                  <p className="text-black text-[12px] font-extralight">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div>
                <p className="italic">"{testimonial.message}"</p>
              </div>
              <div className="flex flex-row gap-1">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < testimonial.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300" />
                  ),
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
