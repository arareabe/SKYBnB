import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingActions from '../../store/booking';
import * as spotActions from '../../store/spots';
import './User.css';
import UserBookingCard from './UserBookingCard';
import UserPastCard from './UserPastCard';

export default function User() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userBookings = useSelector((state) => state.bookings.userBookings);

	const [showBookings, setShowBookings] = useState(false);

  const [futureReservations, setFutureReservations] = useState([]);
	const [passReservations, setPassReservations] = useState([]);


  useEffect(() => {
    const todayDate = new Date().toJSON().slice(0, 10);
    const getData = async () => {
    const allBookings = await dispatch(bookingActions.getUserBookings());
    await dispatch(spotActions.getAllSpots());

    console.log("THIS IS FUTUREEEEEEEEEE", allBookings)
    let futureBooking = [];
    let passBookings = [];
    allBookings?.forEach((booking) => {
      futureBooking.push(booking);
    });
    setFutureReservations(futureBooking.reverse());
    setPassReservations(passBookings);
  };

  if (sessionUser && !Object.values(userBookings).length) getData();
  }, [sessionUser, userBookings.length, ]);


  const handleShowBookings = () => {
    setShowBookings(true);
  };

  return (
    <div className="account-page-wrapper">
      {sessionUser && (
        <div className="account-info">
          <span id="first-last-name">
            {sessionUser?.firstName} {sessionUser?.lastName}
          </span>
          ‎  <span id="email">{sessionUser?.email}</span>
        </div>
      )}

      {/* <div className="account-options">
        <div
          className={`account-spots ${showBookings ? 'show' : ''}`}
          onClick={handleShowBookings}
        >
          Manage Bookings
        </div>
      </div> */}

      <div className="account-display-wrapper">
        {/* {sessionUser && showSpots && (
          <>
            <div className="account-booking-title" id='spots101'>
              <div className='center'>Spots</div>
                        </div>
            {allSpots?.map((spot, i) => (
              <UserSpotCard spot={spot} key={i} />
            ))}
          </>
        )} */}

        {sessionUser && (
          <>
            <div className="account-booking-title" id='bookings101'>
              <div className='center'>Bookings</div>
              <div id="upcoming-reservation">Upcoming reservations</div>
            </div>
            {futureReservations?.map((booking, i) => (
              <UserBookingCard booking={booking} key={i} />
            ))}
            {/* <div className="account-booking-title">
              <div id="upcoming-reservation">Recent Trips</div>
            </div> */}
            {/* <div className="account-display-pass-bookings">
              {passReservations?.map((booking, i) => (
                <UserPastCard booking={booking} key={i} />
              ))}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};
