"use client";
import { testimonials } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong, FaRegStar, FaStar } from "react-icons/fa6";
import { motion } from "motion/react";

const Testimonials = () => {
    const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="bg-white w-full flex flex-col items-center justify-center py-20 md:py-28">
      <div className="w-[90%] flex flex-col md:flex-row gap-20 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-4 items-start "
        >
          <h2 className="md:text-[30px] text-[20px] text-black font-bold">
            Stories from Mune Pet Parents
          </h2>
          <p className="text-[14px] md:text-[18px] text-black font-light">
            Join thousands of Kenyans who are giving their pets the best care
            possible.
          </p>
          <Link
            href="/symptoms"
            className="flex flex-row gap-2 items-center justify-center text-primary font-extrabold"
          >
            <p>Get Started</p>
            <span>
              <FaArrowRightLong />
            </span>
          </Link>
        </motion.div>
        <motion.ul
        variants = {container}
        initial ='hidden'
        whileInView='visible'
        viewport={{once : true, amount : 0.2}}
        className="flex flex-col md:flex-row gap-4 justify-evenly">
          {testimonials.map((testimonial) => (
            <motion.li
            variants={item}
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
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Testimonials;
