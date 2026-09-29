import type { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

function Modal({ onClose, className = "", children }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${className}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
