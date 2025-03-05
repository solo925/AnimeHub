import { motion } from "framer-motion";
import { ComponentType } from "react";

const withAnimation = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Component {...props} />
  </motion.div>
);

export default withAnimation;
