import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/index.css';
import '../css/SearchPage.css';
import React, { useEffect, useState } from 'react';
import ServiceDropdown from '../components/ServiceDropdown';
import { listProviders } from '../actions/providerAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProviderCard from '../components/ProviderCard';
import SearchBox from '../components/SearchBox';
import Paginator from '../components/Paginator';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import moment from 'moment';

// create a new component called search page, which will hold the search bar and the results, and then export it, so that it can be used in the main page
const SearchPage = () => {
  let navigate = useNavigate();

  function redirect_to_addresspage() {
    navigate('/addresspage');
  }

  const { keyword } = useParams();
  const { pageNumber } = useParams();
  const [service, setService] = useState('');
  // console.log(pageNumber);
  // console.log(keyword);
  // use dispatch to call the listProviders action
  const dispatch = useDispatch();
  const providersList = useSelector((state) => state.providers);
  const { loading, error, allProviders, providers, pages, page } =
    providersList;
  // get calenders from the backend
  async function getCalenders() {
    await fetch('/api/calendars', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStartDate(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    dispatch(listProviders(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  const [date, setDate] = useState('');
  const [addr, setAddr] = useState('');

  useEffect(() => {
    async function fetchAddr() {
      await fetch('/api/customers/getDefaultAddress/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAddr(data.address);
        });
    }
    fetchAddr();
    getCalenders();
  }, [addr]);

  const handleServiceChange = (service) => {
    setService(service);
    window.location.href = `/searchpage/${service}`;
  };

  const [startDate, setStartDate] = useState([]);
  let dateFlag = false;
  const handleDateChange = (date) => {
    setDate(date);
    const dateMatch = startDate.filter((item) => {
      return (
        moment(item.startTime).utc(0).format('YYYY-MM-DD HH:mm') ===
        moment(date).format('YYYY-MM-DD HH:mm')
      );
    });
    if (dateMatch.length > 0) {
      dateFlag = true;
    }
    // console.log(dateMatch);
  };
  return (
    <>
      <div className="search-page">
        <SearchBox service={service} key={service._id} />
        <div className="address-form">
          <h2>{addr}</h2>
          {addr == "" ?
            <button onClick={redirect_to_addresspage} className="btn">
              please click here to fill address
            </button> :
            <button onClick={redirect_to_addresspage} className="btn">
              Not where you are?
            </button>}

        </div>
        <div className="filter-div">
          <div className="filter-interior-div">
            <h2>Service Type</h2>
            <div className="filter-interior-dropdown-div">
              <ServiceDropdown
                name="service"
                value={service}
                onChange={handleServiceChange}
              />
            </div>
          </div>
          <div className="filter-interior-div">
            <h2>Time and Date</h2>
            <div className="filter-interior-time-div">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  views={['day', 'hours']}
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField size="small" {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>

        <div className="search-results">
          <header>
            <h1>Recommended Taskers</h1>
          </header>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              {(() => {
                if (date !== '') {
                  const match = startDate.filter((item) => {
                    return (
                      moment(item.startTime)
                        .utc(0)
                        .format('YYYY-MM-DD HH:mm') ===
                      moment(date).format('YYYY-MM-DD HH:mm')
                    );
                  });
                  if (match.length > 0) {
                    const matchedProviders = allProviders.filter((provider) =>
                      match.find((item) => item.providerId === provider._id)
                    );
                    return matchedProviders.map((p) => {
                      return <ProviderCard provider={p} key={p._id} />;
                    });
                  }
                  return providers
                    .sort((a, b) => a.range - b.range)
                    .map((provider) => (
                      <ProviderCard provider={provider} key={provider._id} />
                    ));
                }
                return providers
                  .sort((a, b) => a.range - b.range)
                  .map((provider) => (
                    <ProviderCard provider={provider} key={provider._id} />
                  ));
              })()}
            </div>
          )}
        </div>
        <>
          <Paginator
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      </div>
    </>
  );
};

export default SearchPage;
