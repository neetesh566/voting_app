const express = require("express");
const router = express.Router();
const User = require("../models/candidate");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
const Candidate = require("../models/candidate");

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if(user.role === 'admin'){
      return true;
    }
  } catch (err) {
    return false;
  }
};

router.post("/", jwtAuthMiddleware,  async (req, res) => {
  try {
    if (! await checkAdminRole(req.user.id)) {
      return res.status(404).json({ message: "User does  not have admin role" });
    }
    const data = req.body;

    const newCandidate = new Candidate(data);

    const response = await newCandidate.save();
    console.log("data saved");
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/:candidateID', jwtAuthMiddleware,async(req,res)=>{
    try{
        if (!checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "User does not have admin role" });
          }

          const candidateID = req.params.candidateID;
          const updatedCandidateData = req.body;

          const response = await personalbar.findByIdAndUpdate(candidateID,updatedCandidateData,{
            new:true,
            runValidators:true,
          })

          if(!response){
            return res.status(404).json({error:'Candidate not found'});
          }

          console.log('candidate not found');
          res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


router.delete('/:candidateID', jwtAuthMiddleware,async(req,res)=>{
    try{
        if (!checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "User does  not have admin role" });
          }

          const candidateID = req.params.candidateID;


          const response = await Candidate.findByIdAndDelete(candidateID);
           

          if(!response){
            return res.status(404).json({error:'Candidate not found'});
          }

          console.log('candidate  not  found');
          res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
module.exports = router;
