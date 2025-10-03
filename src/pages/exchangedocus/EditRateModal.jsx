import { useState, useEffect } from "react";

function EditRateModal({ show, onClose, rate, onSave, type }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (rate) {
      setForm({
        [`${type}_buy`]: rate[`${type}_buy`] || "",
        [`${type}_sell`]: rate[`${type}_sell`] || "",
      });
    }
  }, [rate,type]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(rate.id, form); // pass id + updated values
    onClose();
  };

  if (!rate) return null;

  return (
    <>
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              Edit {rate.currency.code} – {rate.currency.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* {["tt", "cash", "earn"].map((type) => ( */}
              <div key={type} className="mb-3">
                <div className="fw-bold text-capitalize">{type} Rates</div>
                <div className="row g-2">
                  <div className="col">
                    <label className="form-label">Buy</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name={`${type}_buy`}
                      value={form[`${type}_buy`] || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Sell</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name={`${type}_sell`}
                      value={form[`${type}_sell`] || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            {/* ))} */}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>

          
        </div>
      </div>
    </div>
    {/* Backdrop */}
    {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default EditRateModal;
