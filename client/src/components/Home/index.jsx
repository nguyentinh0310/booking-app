import { DatePicker } from 'antd';
import { roomApi } from 'api/roomApi';
import Loader from 'components/utils/Loader';
import moment from 'moment';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Room from './Room';
import Banner from 'components/Layout/Banner';
import './Home.css';
import MetaData from 'components/utils/MetaData';

const { RangePicker } = DatePicker;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [duplicateRoom, setDuplicateRoom] = useState([]);
  const [searchRoom, setSearchRoom] = useState('');
  const [filterType, setFilterType] = useState('all');
  const typingTimeoutRef = useRef(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await roomApi.getAllRooms();
        setRooms(response.data);
        setDuplicateRoom(response.data);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  // chọn ngày
  const filterByDate = (dates) => {
    if (!dates) return;
    console.log(moment(dates[0]).format('DD-MM-YYYY'));
    console.log(moment(dates[1]).format('DD-MM-YYYY'));
    setStartDate(dates[0].format('DD-MM-YYYY'));
    setEndDate(dates[1].format('DD-MM-YYYY'));

    let tempRooms = [];
    let availability = false;

    // duyệt qua tất cả rooms
    for (const room of duplicateRoom) {
      // nếu currentBookings > 0 -> loại bỏ ko cho room
      if (room.currentBookings.length > 0) {
        // duyệt qua tất cả  room.currentBooking -> check lịch
        for (const booking of room.currentBookings) {
          console.log(booking);
          
        }
      }
      // nếu currentBookings == 0 -> push(room)
      if (availability === true || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
      // setRooms(tempRooms);
    }
  };

  // chặn chọn ngày trước đó
  function disabledDate(current) {
    return current && current.valueOf() < moment().endOf('day');
  }

  const handleSearchChange = (e) => {
    setSearchRoom(e.target.value);
    const searchString = e.target.value.trim().toLowerCase();
    if (!searchString) {
      return;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const room = duplicateRoom.filter((room) => {
        return room.name.toLowerCase().includes(searchString);
      });
      setRooms(room);
    }, 300);
  };

  const handleFilterType = (e) => {
    setFilterType(e);
    console.log(e);
    if (e !== 'all') {
      const room = duplicateRoom.filter((room) => {
        return room.type.toLowerCase() === e.toLowerCase();
      });
      setRooms(room);
    } else {
      setRooms(duplicateRoom);
    }
  };

  return (
    <Fragment>
      <MetaData title="Trang chủ" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Banner />
          <div className="container" id="home">
            <h1 className="text-center mt-5 title">ĐẶT PHÒNG NGAY</h1>
            <div className="row bs" id="booking-fixed">
              <div className="col-md-4" id="datepicker">
                <RangePicker
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  onChange={filterByDate}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm..."
                  value={searchRoom}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="col-md-4">
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
            </div>

            <div className="row justify-content-center mt-2">
              {rooms?.map((room) => {
                return (
                  <div key={room._id} className="col-md-9 mt-2">
                    <Room room={room} startDate={startDate} endDate={endDate} />
                  </div>
                );
              })}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
