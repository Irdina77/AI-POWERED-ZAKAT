import React from "react";

export default function ActionButtons({ onSave, onReset, onProceed }) {
  return (
    <div className="card">
      <h2 className="card-title">Actions</h2>

      <div className="button-group">
        <button className="btn btn-gold" onClick={onSave}>
          Save Result
        </button>

        <button className="btn btn-outline" onClick={onReset}>
          Reset
        </button>

        <button className="btn btn-dark" onClick={onProceed}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
