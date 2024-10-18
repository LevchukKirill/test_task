import model from "../models/model.js";

class userController {
  async getAll(req, res) {
    try {
      const { name } = req.body;
      const users = await model.User.findAll({ where: name });
      if (!users) throw console.error("Not Found");

      res.json(users);
      // return users;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new userController();
