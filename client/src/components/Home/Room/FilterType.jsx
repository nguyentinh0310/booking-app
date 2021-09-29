import React, { useState } from 'react';

const FilterType = ({ onChange, rooms }) => {
  const [filterType, setFilterType] = useState('all');
  const handleFilterType = (e) => {
    setFilterType(e);
    if (!onChange) return;
    const formValues = {
      filterRoom: e,
    };

    if (e !== 'all') {
      const room = rooms.filter((room) => {
        return room.type.toLowerCase() === e.toLowerCase();
      });
      onChange(formValues, room);
    } else {
      onChange(formValues, rooms);
    }
  };
  return (
    <div>
      <select
        className="form-select"
        value={filterType}
        onChange={(e) => handleFilterType(e.target.value)}
      >
        <option value="all">Tất cả</option>
        <option value="standard">Standard</option>
        <option value="delux">Delux</option>
      </select>
    </div>
  );
};

export default FilterType;
