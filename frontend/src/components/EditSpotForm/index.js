import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './EditSpotForm.css'

import { updateASpot, getSingularSpot } from '../../store/spots';

const EditSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currSpot = useSelector(state => state.spots.singleSpot)

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if (!address.length) errors.push('Address cannot be empty')
    if (!city.length) errors.push('City cannot be empty')
    if (!state.length) errors.push('State cannot be empty')
    if (!country.length) errors.push('Country cannot be empty')
    if (!lat) errors.push('Latitude cannot be empty')
    if (!lng) errors.push('Longitude cannot be empty')
    if (!name.length) errors.push('Name cannot be empty')
    if (!description.length) errors.push('Description cannot be empty')
    if (!price) errors.push('Price cannot be empty')
    if (!imgUrl) errors.push('Image URL cannot be empty')

    setValidationErrors(errors);
  }, [address, city, state, country, lat, lng, name, description, price, imgUrl])

  useEffect(() => {
    dispatch(getSingularSpot(spotId)).then(res => console.log("THIS IS THE RES ", res));
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const updatedInfo = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };

    if (!validationErrors.length) {
      let updatedSpot = await dispatch(updateASpot(spotId, updatedInfo));

      if (updatedSpot) history.push(`/spots/${currSpot.id}`);

      setAddress('')
      setCity('')
      setState('')
      setCountry('')
      setLat('')
      setLng('')
      setName('')
      setDescription('')
      setPrice('')
      setValidationErrors([]);
      setHasSubmitted(false);
    }
  }

  return (
    <div className='editFormWrapper'>
      <form className='editFormPage' onSubmit={submitHandler}>
        <h2 id='editFormTitle'>Update your SkyBnB!</h2>
        <div className='editInputWrapper'>
          <input
            type='text'
            className='editInput'
            placeholder='address'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <input
            type='text'
            className='editInput'
            placeholder='city'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <input
            type='text'
            className='editInput'
            placeholder='state'
            value={state}
            onChange={e => setState(e.target.value)}
          />
          <input
            type='text'
            className='editInput'
            placeholder='country'
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <input
            type='number'
            className='editInput'
            placeholder='latitude'
            value={lat}
            onChange={e => setLat(e.target.value)}
          />
          <input
            type='number'
            className='editInput'
            placeholder='longitude'
            value={lng}
            onChange={e => setLng(e.target.value)}
          />
          <input
            type='text'
            className='editInput'
            placeholder='name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type='text'
            className='editInput'
            placeholder='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type='number'
            className='editInput'
            placeholder='$$$'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input
            type='text'
            className='editInput'
            placeholder='image'
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
          />
        </div>

        {hasSubmitted && validationErrors.length > 0 && (
          <div id='validErrsTitle'>
            To submit a new SkyBnB, please handle the following errors:
            <div className='createValidErrs'>
              {validationErrors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          </div>
        )}

        <div id='editSpotButton'>
          <button id='actualEditButton' type='submit'>Update your SkyBnB!</button>
        </div>
      </form>
    </div>
  )
};

export default EditSpotForm;
