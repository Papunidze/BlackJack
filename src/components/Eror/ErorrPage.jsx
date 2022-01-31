import React from "react";
import "./eror.css";
import { Link } from "react-router-dom";
const ErorrPage = () => {
  return (
    <main className="erorPage">
      <div className="eror_container">
        <div className="eror_overflow">
          <div className="number">404</div>
          <div className="text">
            <span>Ooops...</span> <br></br>page not found
          </div>
        </div>
        <button className="btn green">
          <Link to="/">Home</Link>
        </button>
      </div>
    </main>
  );
};

export default ErorrPage;
