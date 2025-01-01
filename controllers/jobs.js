const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const geAllJobs = async (req, res)=>{
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}
const geJob = async (req, res)=>{
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.findOne({createdBy: userId, _id: jobId})
    if(!job){
      throw new NotFoundError(`No jub with id ${jobId}`)  
    }
    res.status(StatusCodes.OK).json({job})
}
const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req, res)=>{
    const {
        body: {company, position},
        user:{userId}, 
        params:{id:jobId},
    } = req

    if(company === '' || position === ''){
        throw new BadRequestError('Company or position fields can not be empty')
    }
    const job = await Job.findOneAndUpdate({createdBy: userId, _id: jobId}, req.body, {new:true, runValidators: true})
    if(!job){
        throw new NotFoundError(`No jub with id ${jobId}`)  
      }
    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async (req, res)=>{
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.findOneAndRemove({createdBy: userId, _id: jobId})
    if(!job){
        throw new NotFoundError(`No jub with id ${jobId}`)  
      }
      res.status(StatusCodes.OK).send()
}


module.exports={
    geAllJobs,
    geJob,
    createJob,
    updateJob,
    deleteJob
}