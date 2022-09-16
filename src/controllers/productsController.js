import mongo from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { COLLECTIONS } from "../enums/collections.js";

const db = await mongo();

async function getProducts (req, res) {
    const page = Number(req.query.page);

    const maxNumber = 10;
    const from = (page - 1) * maxNumber;
    const to = page * maxNumber;

    let products;

    try {
        products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray();
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

    res.status(STATUS_CODE.OK).send(products.slice(from, to));
};

export { getProducts };