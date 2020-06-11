import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modalActions";
import Login from "../navbar/forms/Login";
import Signup from "../navbar/forms/Signup";

const Modal = ({ modal: { content } }) => {
  return (
    <div>
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {content === "login" && <Login />}
              {content === "signup" && <Signup />}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="#closeModal"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, { closeModal })(Modal);
