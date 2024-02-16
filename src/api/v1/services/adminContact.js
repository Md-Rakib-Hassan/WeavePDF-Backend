const adminContact = require("../../../models/adminContact");

const postAdminContact = async (req, res) => {
  const createNewContact = new adminContact(req.body);
  await createNewContact.save();
};

const getAdminContact = async (req, res) => {
  const contacts = await adminContact.find();
  res.send(contacts);

  //   try {
  //     // Use Mongoose to fetch data from the MongoDB database
  //     const contacts = await adminContact.find();

  //     // Send the fetched data as a response
  //     res.send(contacts);
  //   } catch (err) {
  //     // If an error occurs, send an error response
  //     res.status(500).json({ message: err.message });
  //   }
};
const deleteAdminContact = async (req, res) => {
  const id = req.params.id; // Corrected to use _id
  try {
    const result = await adminContact.deleteOne({ _id: id });
    res.send(result);
  } catch (error) {
    console.log("not deleted");
    res.status(500).send(error.message);
  }
};

module.exports = { postAdminContact, getAdminContact, deleteAdminContact };
