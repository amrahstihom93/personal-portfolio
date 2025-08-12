import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TITLES = [
  "Product Design Engineer",
  "Data Engineer",
  "Consultant"
];

const TypingTitles = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === TITLES[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1200);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % TITLES.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => setBlink((b) => !b), 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  return (
    <motion.div
      className="block relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-black"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ minHeight: "2.5em" }}
    >
      <span>{TITLES[index].substring(0, subIndex)}</span>
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </motion.div>
  );
};

export default TypingTitles;
