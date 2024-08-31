import React from 'react'

type Props = {
  children: React.ReactNode; // モーダル内に表示する内容
  modalRef: React.RefObject<HTMLDialogElement>; // モーダルのDOM要素への参照
}

const Modal: React.FC<Props> = ({ children, modalRef }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        {children}
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default Modal;