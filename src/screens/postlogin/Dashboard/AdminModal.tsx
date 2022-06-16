import './modal.css';

const Modal = ({ show, children }: any) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modal;
