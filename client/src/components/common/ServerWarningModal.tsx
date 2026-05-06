"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

const ServerWarningModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check session storage to see if the user has already seen the warning in this session
    const hasSeenWarning = sessionStorage.getItem("server-warning-seen");
    if (!hasSeenWarning) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("server-warning-seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop - clicking it closes the modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-6 top-6 rounded-full p-2 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-500 shadow-sm border border-amber-100 dark:border-amber-500/20">
                <AlertCircle size={32} />
              </div>

              <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Server Wake-up Notice
              </h2>
              
              <p className="mb-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
                Our backend is hosted on a <span className="font-semibold text-zinc-900 dark:text-zinc-200">free tier</span>. 
                It may take <span className="italic">1-2 minutes</span> to spin up if it has been inactive. 
                Thank you for your patience while we get things ready for you!
              </p>

              {/* Action Button */}
              <button
                onClick={handleClose}
                className="group relative w-full overflow-hidden rounded-2xl bg-black px-8 py-4 font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-zinc-100"
              >
                <span className="relative z-10">I Understand</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServerWarningModal;
