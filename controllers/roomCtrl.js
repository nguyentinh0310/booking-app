const Room = require("../models/roomModel");

const roomCtrl = {
  getAllRooms: async (req, res, next) => {
    try {
      const rooms = await Room.find({});
      return res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  },
  getRoomById: async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id)
      if(!room) return res.status(400).json({
        message: "Not found id room"
      })
      return res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  },

};

module.exports = roomCtrl