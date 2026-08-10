const db = require("../models");

const Komik = db.Komik;
const Penulis = db.Penulis;
const Genre = db.Genre;

async function getAll(req, res) {
    try {
        const komik = await Komik.findAll({
            include: [
                {
                    model: Penulis,
                    as: "penulis",
                    attributes: ["id", "nama", "email"]
                },
                {
                    model: Genre,
                    as: "genre",
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        return res.status(200).json(komik);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
