const express = require('express')
const router = express.Router()

const {geAllJobs,
    geJob,
    createJob,
    updateJob,
    deleteJob} = require('../controllers/jobs')

router.route('/').post(createJob).get(geAllJobs)
router.route('/:id').get(geJob).patch(updateJob).delete(deleteJob)


module.exports = router