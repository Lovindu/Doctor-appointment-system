const FilterDoctor = ({ onFilterChange }) => {
    const handleDayChange = (day) => {
      onFilterChange({ type: "day", value: day });
    };
  
    const handleTimeChange = (time) => {
      onFilterChange({ type: "time", value: time });
    };
  
    return (
      <div className="filter-container">
        <h3>Filter By</h3>
        <div className="filter-section">
          <h4>Available Days</h4>
          <div className="filter-section-div">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <div key={day} className="filter-section-label">
                <input type="checkbox" onChange={() => handleDayChange(day)} /> 
                <p>{day}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h4>Time</h4>
          <div className="filter-section-div">
            {["9AM - 12PM", "12PM - 3PM", "3PM - 6PM", "6PM - 10PM"].map((time) => (
              <div key={time} className="filter-section-label">
                <input type="checkbox" onChange={() => handleTimeChange(time)} /> {time}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default FilterDoctor;
  