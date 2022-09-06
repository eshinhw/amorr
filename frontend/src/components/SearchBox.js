import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  if (longerLength === 0) {
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
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
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

const SearchBox = ({ service }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { keyword } = useParams();
  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  let flag = false;
  let similar = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    // a similarity array between the selected service and all services
    if (searchKeyword) {
      const similarityServiceArray = services
        .map((service) => {
          return {
            service: service,
            similarity: similarity(service.value, searchKeyword),
          };
        })
        .sort((a, b) => {
          return b.similarity - a.similarity;
        });
      if (similarityServiceArray[0].similarity > 0.22) {
        flag = true;
        similar = similarityServiceArray[0].service.label;
      }
      // console.log(similarityServiceArray);
    }

    if (searchKeyword.trim()) {
      if (flag === true) {
        window.location.href = `/searchpage/${similar}`;
      } else {
        window.location.href = `/searchpage/${searchKeyword}`;
      }
    } else if (service) {
      window.location.href = `/searchpage/${service}`;
    } else {
      window.location.href = '/searchpage';
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-btn">
        <button className="search-icon" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <input
        type="text"
        className="search-text"
        placeholder={
          keyword
            ? 'No Results? Try With Another Service'
            : 'Explore Your Beauty Today'
        }
        // value={searchKeyword}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBox;
