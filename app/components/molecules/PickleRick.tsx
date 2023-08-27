import { motion } from "framer-motion";
import Image from "next/image";

export const PickleRick = () => {
  return (
    <motion.div
      className="-z-10 mt-auto flex justify-center"
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: -200, rotate: 180 }}
      transition={{
        ease: "linear",
        repeatType: "mirror",
        duration: 3.5,
        repeat: Infinity,
      }}
    >
      <Image
        height={735}
        width={300}
        alt="pickle"
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2aba9247-2ca7-423b-832b-663ce34db900/demdqk4-157a876f-17ce-4b0d-b344-238fa8028251.png/v1/fill/w_1280,h_1345/pickle_rick_png_by_yellogre_demdqk4-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM0NSIsInBhdGgiOiJcL2ZcLzJhYmE5MjQ3LTJjYTctNDIzYi04MzJiLTY2M2NlMzRkYjkwMFwvZGVtZHFrNC0xNTdhODc2Zi0xN2NlLTRiMGQtYjM0NC0yMzhmYTgwMjgyNTEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.qlC5RYVS_AkmeJ0A65UBOEIsXa9d54BX3ymJEsvrcv8"
      />
    </motion.div>
  );
};
