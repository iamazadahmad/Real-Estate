import Consult from "../models/consult.model.js";

export const createConsult = async (req, res, next) => {
     try {
          const consult = await Consult.create(req.body);
          return res.status(201).json(consult);
     } catch (error) {
          next(error);
     }
};

export const getConsult = async (req, res, next) => {
     try {
          const consultations = await Consult.find();
          res.json(consultations);

     } catch {
          res.status(500).json({ success: false, message: error.message });
     }
};