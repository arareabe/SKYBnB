import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import '../AllSpots/AllSpots.css';

import { getAllSeaque } from '../../store/search';

const Seaque = () => {
  const dispatch = useDispatch();
  const { searchWord } = useParams();

  const allSpots = useSelector(state => Object.values(state.search.allSeaque));

  useEffect(() => {
    dispatch(getAllSeaque(searchWord))
  }, [dispatch]);

  useEffect(() => {
    console.log(allSpots);
  })

  if (!allSpots) return 'Loading all available spots!...'

  return (
    <div className='allSpotsWrap'>
      {/* <div className='titlePage'>
        <h1>Welcome to SkyBnB!</h1>
      </div> */}
      <div className='spotWrapper'>
        <div className='spotCards'>
          {allSpots.map(spot =>
            <div className='spotCard'>
              {console.log('THIS IS THE SPOT ', typeof spot === 'object', spot)}
              <NavLink className='spotLink' to={`/spots/${spot.id}`}>
                <div className='imageDiv'>
                  <img src={spot.previewImage} className='image'></img>
                </div>

                <div className='cardInfo'>
                  <div className='cardTopInfo'>
                    <div>
                      {spot.city}, {spot.state}
                    </div>
                    <div>
                      <i id='spotStar' className="fa-sharp fa-solid fa-star"></i>
                      {spot.avgRating}
                    </div>
                  </div>

                  <div id='spotName'>
                    {spot.name}
                  </div>

                  <div className='spotPrice'>
                    <span id='actualPrice'>${spot.price}</span>
                    <span>{' '}night</span>
                  </div>
                </div>

              </NavLink>
            </div>
          )}
        </div>
     </div>
    </div>
  )
}

export default Seaque;
