const cds = require("@sap/cds");
const { cities } = cds.entities;
module.exports = function (srv) {
    srv.on("addCity", async (req) => {
        try {
            const { name, area, population } = req.data;
            await UPSERT.into(cities).columns("name", "area", "population").values(name, area, population);
            req.http.res.status(200).send({ status: 200, data: {} });
        } catch (error) {
            req.http.res.status(500).send({ status: 500, error: error.message });
        }
    });
}