"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BorderButton from "./gradientButton";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function LetsTalkSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(errors);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsSubmitting(false);
  };

  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };

  return (
    <div
      id="contact"
      style={gradientStyle}
      className="min-h-screen bg-black text-white py-16 px-4 md:px-6 lg:px-8"
    >
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal mb-16 tracking-tight">
              <span className="bg-gradient-to-r from-white to-[#a0d2eb] text-transparent bg-clip-text">
                Let&apos;s talk!
              </span>
            </h1>

            <div className="space-y-12">
<div>
  <p className="text-gray-400 mb-2">Office:</p>
  <p>VebForge HQ,</p>
  <p>14th Floor, Orion Tech Park</p>
  <p>Sector 21, Silicon Avenue</p>
  <p>Toronto, ON, Canada</p>
  <p>Local time: 06:17:37</p>
</div>


              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 mb-2">Email:</p>
                <p className="text-2xl md:text-3xl">help@VebForge.com</p>
              </div>

              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 mb-2">Phone:</p>
                <p className="text-2xl md:text-3xl">+1 (2) 34 567 89</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-[#0d0d0d] border-gray-800 rounded-md h-12"
                  {...register("name", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-[#0d0d0d] border-gray-800 rounded-md h-12"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block">
                  Phone
                </label>
                <Input
                  id="phone"
                  placeholder="+1 (2) 34 567 89"
                  className="bg-[#0d0d0d] border-gray-800 rounded-md h-12"
                  {...register("phone")}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Hi team VebForge! I'm reaching out for..."
                  className="bg-[#0d0d0d] border-gray-800 rounded-md min-h-[120px]"
                  {...register("message", { required: true })}
                />
              </div>

              <div>
                <BorderButton
                  borderWidth={0.6}
                  type="submit"
                  disabled={isSubmitting}
                  borderSegmentSize={70}
                  className="text-sm !border !border-gray-800  rounded-md px-8 py-4 h-11 w-[160px]"
                >
                  <span className="text-md font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Submit
                  </span>
                </BorderButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
