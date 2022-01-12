const { Available } = require("../../../db");

const postAvailability = async (req, res) => {
  const { date, initialTime, endingTime } = req.body; // MIGRAR A ARREGLO DE OBJETO
  const { idCourt } = req.params;

  let newAvailability = await Available.create({
    date,
    initialTime,
    endingTime,
    idCourt,
  });
  newAvailability = await newAvailability.save().catch((err) => {
    res.json({ error: "No se puede agregar disponibilidad correctamente" });
  });
  if (newAvailability)
    res.json({ message: "La disponibilidad se ha agregado correctamente" });
};

module.exports = { postAvailability };
