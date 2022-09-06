import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// reactstrap components
import { Form, Card, CardBody } from 'reactstrap';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import '../css/providerRegister.css';

const SignUpProviderTwo = () => {
  // read passed in data
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(location.state);

  const handleChange = (input, fieldName) => {
    setData({ ...data, [fieldName]: input.value });
  };

  // trigger when clicked sign up button
  function signUpForm(e) {
    navigate('/signupproviderthree', { state: data });
    e.preventDefault();
  }

  return (
    <div className="divCenter">
      <Card className="twoCard">
        <CardBody>
          <Form onSubmit={signUpForm.bind(this)} className="twoForm">
            <h3>What kind of work are you planning to serve?</h3>
            {/*https://iambumblehead.github.io/react-dropdown-now/?path=/story/docs-introduction--page */}
            <div className="center">
              <Dropdown
                placeholder="Barbering"
                options={[
                  'Barbering',
                  'Eyelash Tech',
                  'Hairdressing',
                  'House Cleaning',
                  'Landscaping',
                  'Makeup',
                  'Massage',
                  'Nail Tech',
                ]}
                value="Barbering"
                onChange={(option) => handleChange(option, 'title')}
              />
            </div>
            <h3>What range would you like for your service?</h3>
            <div className="center">
              <Dropdown
                placeholder="10 KM"
                options={['10 KM', '20 KM', '30 KM']}
                value="10 KM"
                onChange={(option) => handleChange(option, 'range')}
              />
            </div>
            {/*
              onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
              onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
              onOpen={() => console.log('open!')}  */}
            <h3>Are You Individual?</h3>
            <div className="center">
              <Dropdown
                placeholder="Yes"
                options={['Yes', 'No']}
                value="Yes"
                onChange={(option) => handleChange(option, 'individual')}
              />
            </div>
            <div className="center">
              <button
                className={'Button'}
                type="submit"
                style={{ marginTop: '30pt' }}>
                Next Step
              </button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpProviderTwo;
