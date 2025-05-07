import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          className="text-5xl sm:text-7xl md:text-[100px] lg:text-[130px] xl:text-[150px] leading-tight sm:leading-[1.2] md:leading-[1.1] text-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        >
              <img src="/intro.gif" alt="Logo" width={350} height={22} />

        </motion.h1>
      </div>


    </motion.div>
  );
}
