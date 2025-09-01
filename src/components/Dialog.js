"use client";
import React, { useRef } from "react";
import { X } from "lucide-react";

export default function Dialog({
  title,
  onClose,
  onOk,
  children,
  isOpen,
  footerButtons,
}) {
  const modalRef = useRef();

  if (!isOpen) return null;

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col justify-center items-center z-10"
    >
      <div className="w-[450px] max-w-full rounded-xl shadow-lg flex flex-col">
        <button onClick={onClose} className="text-white place-self-end mb-4">
          <X size={30} />
        </button>
        <div className="flex justify-between items-center bg-indigo-600 px-6 py-4 rounded-t-xl">
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
        <div className="p-6 rounded-b-xl bg-white">
          {/* Body content */}
          {children}

          {/* Footer buttons */}
          <div className="flex justify-end mt-4 gap-4">
            {footerButtons && footerButtons(onClose, onOk)}
          </div>
        </div>
      </div>
    </div>
  );
}
