import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../utility/spinner/Spinner";
import { getAllBookings } from "../../../actions/authActions";

const Bookings = ({ auth: { user, loading, allBookings }, getAllBookings }) => {
  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  const allBooking = user.role !== 1 ? user.rented : allBookings;

  return loading ? (
    <Spinner />
  ) : (
    <div className="container p-5">
      <h1 className="main-header-text text-center">Bookings</h1>
      <hr />

      <div class="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              allBooking.map((rentItem, i) => {
                return (
                  <tr key={i}>
                    <th scope="col">{i + 1}</th>
                    <td>{rentItem.name}</td>
                    <td>{rentItem.from}</td>
                    <td>{rentItem.to}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {allBooking.length === 0 && (
        <h2 className="sub-text text-center mt-5">No Bookings Found...</h2>
      )}
    </div>
  );
};

const mapStateToPorps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToPorps, { getAllBookings })(Bookings);
