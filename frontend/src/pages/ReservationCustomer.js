import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
const ReservationCustomer = () => {   
    
  const { isCompleted }  = useParams();
  function rateReservationButton () {
    return (<Link to="/reviews" >
              <button className="reservationButton">Rate the Service Provided</button>
            </Link>);
  }

  function cancelButton () {
    return (<button className="reservationButton">Cancel this appointment</button>);
  }

    return (
      <div
      style={{
        display: 'flex',
        justifyContent: 'left',
        width: '100%',
        paddingTop: '10pt',
        paddingBottom: '30pt',
      }}>
        <br></br>
        <div
        >
          
          <Card className="reservationCardView">
            <CardBody>
              <div>
                <h1>
                  [Reservation Number]
                </h1>
                <p>
                  <img
                    src={require('../images/barber.jpg')}
                    className="profileImage"
                  />
                </p>
  
                <p className="displayProfileLine">[Provider Name]</p>
                <div>
                  <p className="displayProfileLine">[Provider Address]</p>
                  <p className="displayProfileLine">[Service reserved]</p>
                </div>
                <br></br>
                <p className="displayProfileLine">[Provider Phone Number]</p>
                <p className="displayProfileLine">[Scheduled Date]</p>
                <p className="displayProfileLine">[Scheduled Time]</p>
                {isCompleted ? <p className="displayProfileLine">[Completion Date]</p> : null}
                {isCompleted ? <p className="displayProfileLine">[Completion Time]</p> : null}
              </div>
            </CardBody>
          </Card>
        
        </div>
        <br></br>
        <div className="displayReservationButton">
          <Card className="reservationButtonCard">          
            {isCompleted ? rateReservationButton() : cancelButton()}
          </Card>
        </div>      
        
        
      </div>
    );
  };
  export default ReservationCustomer;