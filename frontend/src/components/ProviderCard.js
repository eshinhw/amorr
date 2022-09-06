import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars'

function roundHalf(num1, num2) {
  if(num2===0)
    return 0;
  return Math.round((num1/num2)*2)/2;
}

const ProviderCard = ({ provider }) => {
  const rating = {
    size: 20,
    value: roundHalf(provider.totalRating, provider.ratingPopulation),
    edit: false
  };
  let ratingPopulation = provider.ratingPopulation;

  return (
    <div>
      <Link
        key={provider._id}
        id="provider-card"
        to={`/provider/${provider._id}`}>
        <div className="search-result">
          <img
            src="https://source.unsplash.com/et_78QkMMQs/600x300"
            // src={require('../images/barber.jpg')}
            alt="barber"
            className="image-barber"
          />

          <div className="search-result-text">
            <h3>{provider.name}</h3>
            <p>{provider.title}</p>
            <div className="rate">
              <ReactStars {...rating}/>
              <h6 className="outof">{ratingPopulation} reviews</h6>
            </div>
          </div>
          <div id="view-profile" to={`/provider/${provider._id}`}>
            View Profile
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProviderCard;
