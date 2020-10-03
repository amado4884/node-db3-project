const knex = require("knex");
const knexFile = require("../knexfile");
const db = knex(knexFile["development"]);

const find = async () => {
  try {
    return await db("schemes");
  } catch (err) {
    return err;
  }
};

const findById = async (id) => {
  try {
    const s = await db("schemes").where({ id }).first();
    if (!s) return null;
    return s;
  } catch (err) {
    return err;
  }
};

const findSteps = async (id) => {
  try {
    return await db("steps").where({ scheme_id: id }).orderBy("step_number");
  } catch (err) {
    return err;
  }
};

const add = async (scheme) => {
  try {
    const s = await db("schemes").insert(scheme);
    return await db("schemes").where({ id: s[0] }).first();
  } catch (err) {
    return err;
  }
};

const update = async (changes, id) => {
  try {
    const s = await findById(id);
    await db("schemes").update(changes).where(s);
    return await db("schemes").where({ id }).first();
  } catch (err) {
    return err;
  }
};

const remove = async (id) => {
  try {
    const s = await findById(id);
    if (!s) return null;
    await db("schemes").where(s).first().del();
    return s;
  } catch (err) {
    return err;
  }
};

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
