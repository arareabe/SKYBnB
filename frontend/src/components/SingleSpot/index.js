import { useEffect, useState } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import * as bookingActions from '../../store/booking'
import useModalVariableContext from '../../context/ModalVariable';

import { getSingularSpot, removeASpot } from '../../store/spots';
import AllReviews from '../AllReviews';
import './SingleSpot.css'

const SingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

	const [bookingDates, setBookingDates] = useState('');
	const [selectedStartDate, setSelectedStartdate] = useState('');
	const [spotBookings, setSpotBookings] = useState([]);
	const [serviceFee, setServiceFee] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [priceBeforeFee, setPriceBeforeFee] = useState(0);
	const [totalStay, setTotalStay] = useState(0);
	const [tax, setTax] = useState(0);
	const [grandTotal, setGrandTotal] = useState(0);
	const [bookingDetails, setBookingDetails] = useState(false);
	const [availabilityButton, setAvailabilityButton] = useState('');

	const [haveDateSelected, setHaveDateSelected] = useState(true);
	const [calendarOpened, setCalendarOpened] = useState(false);

	const [haveCalendarRendered, setHaveCalendarRendered] = useState(false);

	// const {
	// 	showModalLogin,
	// 	setShowModalLogin,
	// 	showModalSignup,
	// 	setShowModalSignup
	// } = useModalVariableContext();

	const [errors, setErrors] = useState({});

	const [showBookedModal, setShowBookedModal] = useState(false);
	const [confirmedDate, setConfirmedDate] = useState('');

  useEffect(() => {
    dispatch(getSingularSpot(spotId));
  }, [dispatch, spotId]);

  const formatDate = (date, key) => {
		const day = new Date(date).toDateString().toString();
		return day.split(' ')[0].split('').slice(0, 2).join('');
	};

	function currencyFormat(num) {
		return num.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	};

	useEffect(() => {
		const box = document.getElementsByClassName(
			'react-daterange-picker__inputGroup'
		);
		const checkIn = document.createElement('div');
		const checkOut = document.createElement('div');
		checkIn.classList.add('date-checkin-label');
		checkOut.classList.add('date-checkin-label');

		const contentCheckIn = document.createTextNode('CHECK-IN');
		const contentCheckOut = document.createTextNode('CHECK-OUT');
		checkIn.appendChild(contentCheckIn);
		checkOut.appendChild(contentCheckOut);
		box[0].prepend(checkIn);
		box[1].prepend(checkOut);
	}, []);

	useEffect(() => {
		if (bookingDates) {
			setBookingDetails(true);
			setHaveDateSelected(false);
			const totalStay = Math.floor(
				(new Date(bookingDates[1]) - new Date(bookingDates[0])) / 86400000
			);
			const priceBeforeFee = parseInt(theSpot.price * totalStay);
			const serviceFee = parseInt((theSpot.price * totalStay * 0.145).toFixed(0));
			const totalPrice = serviceFee + priceBeforeFee + 300;
			const taxes = totalPrice * 0.15;
			const grandTotal = totalPrice + taxes;
			setPriceBeforeFee(currencyFormat(priceBeforeFee));
			setServiceFee(currencyFormat(serviceFee));
			setTotalPrice(currencyFormat(totalPrice));
			setTotalStay(totalStay);
			setTax(currencyFormat(taxes));
			setGrandTotal(currencyFormat(grandTotal));
		} else {
			setBookingDetails(false);
			setHaveDateSelected(true);
		}
	}, [bookingDates]);

	// move the open calendar button into a different place.
	useEffect(() => {
		if (haveDateSelected) {
			let calendarButton = document.getElementById('show-calendar-button');
			const newLocationForButton = document.getElementById('show-calendar-div');
			if (!availabilityButton) setAvailabilityButton(calendarButton);
			calendarButton = availabilityButton ? availabilityButton : calendarButton;
			newLocationForButton.append(calendarButton);
		} else {
			const newLocationForButton = document.getElementById('show-calendar-div');
			while (newLocationForButton.lastElementChild) {
				newLocationForButton.removeChild(newLocationForButton.lastElementChild);
			}
		}
	}, [haveDateSelected]);

	useEffect(() => {
		const calendarDiv = document.getElementsByClassName('react-calendar');
		if (calendarOpened) {
			const clearDateButton = document.getElementById('clear-date-button');
			calendarDiv[0].append(clearDateButton);
		}
		if (!haveCalendarRendered) setHaveCalendarRendered(calendarDiv);
	}, [calendarOpened]);

  const handleSubmitBooking = async (e) => {
		e.preventDefault();

		// if (!user) {
		// 	return setShowModalLogin(true);
		// }
		if (user?.id == theSpot.ownerId) {
			setHaveDateSelected(true);
			setBookingDetails(false);
			setBookingDates('');
			return window.alert('You cannot book your own spot!');
		}
		setConfirmedDate(bookingDates);
		const startDate = new Date(bookingDates[0])
			.toJSON()
			.slice(0, 10)
			.toString();
		let endDate = new Date(bookingDates[1]);
		endDate.setHours(endDate.getHours() - 23);
		endDate = new Date(endDate).toJSON().slice(0, 10).toString();

		const bookingInfo = { startDate, endDate };

		const newBooking = await dispatch(
			bookingActions.createBooking(theSpot.id, bookingInfo)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		});
		if (newBooking) {
			let bookings = await dispatch(bookingActions.getSpotBookings(theSpot.id));
			bookings = bookings.map((booking) => [
				booking.startDate,
				booking.endDate
			]);
			setSpotBookings(bookings);
			setErrors({});
			setHaveDateSelected(true);
			setBookingDetails(false);
			setShowBookedModal(true);
			setBookingDates('');
		}
	};



  const theSpot = useSelector(state => state.spots.singleSpot);
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    console.log(theSpot)
  }, [])

	useEffect(() => {
		if (errors.endDate || errors.startDate)
			window.alert(errors.endDate ? errors.endDate : errors.startDate);
	}, [errors]);

  const removeSpot = () => {
    const removedSpot = dispatch(removeASpot(spotId))

    if (removedSpot) history.push('/');
  }

  if (!theSpot) return "That ain't a spot!"

  return (
    <div className='singleSpotGrid'>
      <div className='singleSpotName'>
        <h1>{theSpot.name}</h1>
      </div>

      <div className='singleSpotTopInfo'>
        <span>
          <i id='spotStar' className="fa-sharp fa-solid fa-star"></i>{theSpot.avgRating} · {theSpot.numReviews} reviews · Superhost · {theSpot.city}, {theSpot.state}, {theSpot.country}
        </span>
      </div>

      <div className='singleSpotImage'>
          <img id='actualImg' src={theSpot.SpotImages ? theSpot.SpotImages[0].url : null} />
      </div>

      <div className='singleSpotSidebar'>
        <div>
          <span>${theSpot.price} night {' '}</span>
          <span><i id='spotStar' className="fa-sharp fa-solid fa-star"></i>{theSpot.avgRating} · {theSpot.numReviews} {theSpot.numReviews === 1 ? 'review' : 'reviews'} {' '}</span>
        </div>
        <DateRangePicker
						onChange={setBookingDates}
						value={bookingDates}
						minDate={new Date()}
						onClickDay={(value, event) => {
							if (selectedStartDate) setSelectedStartdate('');
							else setSelectedStartdate(value.toJSON().slice(0, 10).toString());
						}}
						rangeDivider={false}
						showDoubleView={true}
						monthPlaceholder={'mm'}
						yearPlaceholder={'yyyy'}
						dayPlaceholder={'dd'}
						showNeighboringMonth={false}
						calendarIcon={
							<button id="show-calendar-button">Check availability</button>
						}
						clearIcon={
							calendarOpened ? (
								<button id="clear-date-button">Clear dates</button>
							) : null
						}
						goToRangeStartOnSelect={false}
						showFixedNumberOfWeeks={false}
						tileDisabled={({ activeStartDate, date, view }) => {
							let currDate = date.toJSON().slice(0, 10).toString();
							if (currDate <= new Date().toJSON().slice(0, 10)) return true;
							for (let i = 0; i < spotBookings.length; i++) {
								let bookingDate = spotBookings[i];
								if (bookingDate[0] <= currDate && bookingDate[1] >= currDate)
									return true;

								if (selectedStartDate) {
									if (selectedStartDate > currDate) return true;
									if (
										bookingDate[0] > selectedStartDate &&
										currDate > bookingDate[0]
									)
										return true;
								}
							}
						}}
						view={'month'}
						formatShortWeekday={(locale, date) => formatDate(date, 'dd')}
						onClick={() =>
							haveCalendarRendered.length ? setCalendarOpened(true) : null
						}
						// disabled={disabled}
						calendarClassName="booking-calendar"
					/>
          <div
						id="show-calendar-div"
						onClick={() => setCalendarOpened(true)}
					></div>
					{bookingDates ? (
						<button className="reserve-button" onClick={handleSubmitBooking}>
							Reserve
						</button>
					) : null}
					{bookingDetails && (
						<>
							<div className="wrapper-fee">
								<div>
									${theSpot.price} x {totalStay} nights
								</div>
								<div>{priceBeforeFee}</div>
							</div>
							<div className="wrapper-fee">
								<div>Cleaning fee</div>
								<div>$300</div>
							</div>
							<div className="wrapper-fee feeS">
								<div>Service fee</div>
								<div>{serviceFee}</div>
							</div>
							<div className="total-price-wrapper">
								<div className="title-tot">Total: </div>
								<div className="tot">{totalPrice}</div>
							</div>
						</>
					)}
        {/* <button>Reserve {' '}</button> */}
        <span>You won't be charged yet!</span>
				{showBookedModal && (
				<Modal
					onClose={() => {
						setShowBookedModal(false);
					}}
				>
					<div className="confirmed-booking-modal-wrapper">
						<div id="congrat-div">Congratulation, your trip is confirmed!</div>
						<div className="comfirmed-booking-modal-content-wrapper">
							<div className="comfirmed-booking-modal-content">
								<div className="confirmed-booking-modal-title">Dates</div>
								<div>
									{new Date(confirmedDate[0]).toDateString().slice(0, 10)} -{' '}
									{new Date(confirmedDate[1]).toDateString().slice(0, 10)},{' '}
									{new Date(confirmedDate[1]).toDateString().slice(-4)}
								</div>
							</div>
							<div className="comfirmed-booking-modal-content">
								<div className="confirmed-booking-modal-title">
									Price details
								</div>
								<div className="fees-wrapper">
									<div>
										${theSpot.price} x {totalStay} nights
									</div>
									<div>{priceBeforeFee}</div>
								</div>
								<div className="fees-wrapper">
									<div>Cleaning fee</div>
									<div>$300</div>
								</div>
								<div className="fees-wrapper">
									<div>Service fee</div>
									<div>{serviceFee}</div>
								</div>
								<div className="fees-wrapper serviceFee">
									<div>Taxes</div>
									<div>{tax}</div>
								</div>
								<div className="total-price-wrapper">
									<div className="total-title">Total (USD): </div>
									<div className="total">{grandTotal}</div>
								</div>
								<div>
									You can manage all your trips in your
									user page.
								</div>
								<div
									className="confirmed-trip-modal-done-button"
									onClick={() => setShowBookedModal(false)}
								>
									Done
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}
      </div>

      <div className='singleSpotDesc'>
        <div className='ownerDetails'>
          <span id='actualOwner'>{`Home hosted by ${theSpot.Owner?.firstName ? theSpot.Owner.firstName : 'Bill'}`}</span>
          <span>6 guests · 3 bedrooms· 4 beds· 2 bath</span>
        </div>

        <div className='spotPerks'>
          <div>
            <h3>Fast wifi</h3>
            <p>At 100 Mbps, you can take video calls and stream videos for the whole group.</p>
          </div>
          <div>
            <h3>Self check-in</h3>
            <span>Check yourself in with the smartlock.</span>
          </div>
          <div>
            <h3>Dedicated workspace</h3>
            <p>A private room with fast wifi that's well-suited for working.</p>
          </div>
        </div>

        <div className='aircoverBox'>
          <img id='aircoverLogo' src='data:image/png;base64,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' />
          <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
        </div>

        <div className='spotDescriptionBox'>
          <h3>{theSpot.description}</h3>
        </div>
      </div>

      {currentUser && currentUser.id === theSpot.Owner?.id && (
        <div className='singleUserButtons'>
          <NavLink className='singleUserEditDelete' to={`/spots/${spotId}/edit`}>Edit your SkyBnB</NavLink>
          <button className='singleUserEditDelete' onClick={() => removeSpot()}>Delete your SkyBnB</button>
        </div>
      )}

      <div className='singleSpotReviews'>
        <div className='reviewTop'>
          <i id='spotStar' className="fa-sharp fa-solid fa-star"></i>{theSpot.avgRating} · {theSpot.numReviews} {theSpot.numReviews === 1 ? 'review' : 'reviews'}
        </div>
        <div>
          <AllReviews spotId={spotId} />
        </div>
      </div>

    </div>

  )
}

export default SingleSpot;
