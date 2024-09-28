import React, { useEffect, useRef } from "react";

function Modal({ onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-30">
      <div
        ref={modalRef}
        className="p-4 max-w-4xl w-full h-full rounded-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          &times;
        </button>
        <div className="w-full h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
