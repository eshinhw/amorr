import Select from 'react-select';
import React from 'react';
import { useParams } from 'react-router-dom';

const services = [
  { value: 'barbering', label: 'Barbering' },
  { value: 'eyelash tech', label: 'Eyelash Tech' },
  { value: 'hairdressing', label: 'Hairdressing' },
  { value: 'house cleaning', label: 'House Cleaning' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'massage', label: 'Massage' },
  { value: 'nail tech', label: 'Nail Tech' },
];

// Using Levenshtein Distance to find the similarity between two strings
// https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
const customStyles = {
  option: (provided) => ({
    ...provided,
    color: 'white',
  }),
};

const ServiceDropdown = ({ onChange }) => {
  const { keyword } = useParams();
  // find index of selected service
  // a similarity array between the selected service and all services
  let selectedIndex = -1;
  // console.log(keyword);
  if (keyword) {
    const similarityArray = services
      .map((service) => {
        return {
          service: service,
          index: services.indexOf(service),
          similarity: similarity(service.value, keyword),
        };
      })
      .sort((a, b) => {
        return b.similarity - a.similarity;
      });
    // console.log(similarityArray);
    selectedIndex = similarityArray[0].index;
  }
  return (
    <div className="dropdown-container">
      <Select
        className="dropdown"
        defaultValue={services[selectedIndex]}
        placeholder={<div style={{color:"white"}}>Select a Service</div>}
        options={services}
        noOptionsMessage={() => 'Service Not Found'}
        styles={customStyles}
        onChange={(e) => onChange(e.label)}
        theme={(theme) => ({
          ...theme,
          borderRadius: 15,
          colors: {
            ...theme.colors,
            neutral0: '#ff7675',
            neutral80: 'white',
            primary25: '#fa81b5',
            primary: '#fa81b5',
            neutral90: 'white',
          },
        })}
      />
    </div>
  );
};

export default ServiceDropdown;
