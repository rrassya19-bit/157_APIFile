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

async function create(req, res) {
    try {
        const {
            judul,
            sinopsis,
            tahun_terbit,
            penulis_id,
            genre_ids
        } = req.body;

        const penulis = await Penulis.findByPk(penulis_id);
        if (!penulis) {
            return res.status(404).json({
                message: "Penulis tidak ditemukan."
            });
        }

        const komik = await Komik.create({
            judul,
            sinopsis,
            tahun_terbit,
            penulis_id
        });

        if (genre_ids && genre_ids.length > 0) {
            const genres = await Genre.findAll({
                where: {
                    id: genre_ids
                }
            });

            await komik.setGenre(genres);
        }

        const result = await Komik.findByPk(komik.id, {
            include: [
                {
                    model: Penulis,
                    as: "penulis"
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

        return res.status(201).json({
            message: "Komik berhasil ditambahkan.",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
