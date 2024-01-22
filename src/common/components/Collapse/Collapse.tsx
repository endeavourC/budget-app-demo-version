import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronDown } from "react-icons/bs";

interface CollapseProps {
  className?: string;
  title?: React.ReactNode;
}

export const Collapse: React.FC<PropsWithChildren<CollapseProps>> = ({
  className,
  title,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const classes = classNames({
    "border-2 border-backgroundPrimary p-4 rounded-lg": true,
  });

  const onToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={twMerge(classes, className)}>
      <div className="relative cursor-pointer " onClick={onToggle}>
        {title ? title : null}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {isCollapsed ? <BsChevronDown /> : <BsChevronLeft />}
        </div>
      </div>
      <AnimatePresence>
        {isCollapsed ? (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
