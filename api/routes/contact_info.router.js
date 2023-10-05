const router = require('express').Router()
const {    getAllContactInfos,
    getOneContactInfo,
    createContactInfo,
    updateContactInfo,
    deleteContactInfo} = require('../controllers/contact_info.controller.js')


router.get('/', getAllContactInfos)
router.get('/:id', getOneContactInfo)
router.post('/', createContactInfo)
router.put('/:id', updateContactInfo)
router.delete('/:id', deleteContactInfo)


module.exports = router