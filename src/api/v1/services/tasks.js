const Tasks=require('../../../models/Tasks');
const postTask=async (req, res) =>{
  const newTask= new Tasks(req.body);
  await newTask.save();

}

const getTask = async(req, res) => {

    const results=await Tasks.find({user_email: req.params.email})
    res.send(results);
  
  }

module.exports = {postTask, getTask};