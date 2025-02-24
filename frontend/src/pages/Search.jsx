import React, { useState } from 'react';
import Nav from '../components/Nav';
import './Search.css';
import DoctorCard from '../components/DoctorCard';
import useFetch from '../hooks/useFetch';

const Search = () => {
  const {error, loading, data} = useFetch("http://localhost:3000/api/doctor/alldoctors");
  console.log(data);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const filterDoctors = (searchString, doctors) => {
    if(!searchString) return doctors;
    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  const filteredDoctors = filterDoctors(search,data);
  console.log(search);

  return (
    <div className='search'>
      <Nav/>

      <div className='search--body'>

        <div className='search--filters'>
          <h2>Filters</h2>

          <div>
            <h4>Time</h4>
              <div className='search--filter-check'>
                <input type="checkbox" id='morning' value="morning" name='timecheck'/>
                <label htmlFor="morning">Morning</label>
              </div>

              <div className='search--filter-check'>
                <input type="checkbox" id='noon' value="Noon" name='timecheck'/>
                <label htmlFor="noon">Noon</label>
              </div>

              <div className='search--filter-check'>
                <input type="checkbox" id='afternoon' value="Afternoon" name='timecheck' />
                <label htmlFor="afternoon">Afternoon</label>
              </div>

              <div className='search--filter-check'>
                <input type="checkbox" id='night' value="night" name='timecheck'/>
                <label htmlFor="night">Night</label>
              </div>
            <div>

            </div>
          </div>
        </div>

        <div className='search--results'>
          <div className='search--searchbar'>
            <input type="text" name='search'placeholder='Search' onChange={handleSearch}/>
            <select name="speciality" id="speciality">
              <option value="">select speciality</option>
              <option value="Eye surgeon">Eye surgeon</option>
              <option value="physician">Physician</option>
            </select>
          </div>

          <div className='search--cards'>
            {filteredDoctors.map((item) => {
              return <DoctorCard 
                key={item._id}
                name={item.name}
                Speciality={item.speciality}
                docID={item._id}
                image={item.image}
              />
            })}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Search
