const ContactInfo = require('../models/contact_info.model.js')

async function getAllContactInfos (req, res) {
    try {
        const contactInfos = await ContactInfo.findAll()
        return res.status(200).json({contactInfos})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

async function getOneContactInfo(req, res) {
    try {
        const contactInfo = await ContactInfo.findByPk(req.params.id)
        if(contactInfo) {
            return res.status(200).json({contactInfo})
        }
        else {
            return res.status(404).json({errorMessage: "Contact Info not found"})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


async function createContactInfo (req, res) {
    try {
        const newContactInfo = await ContactInfo.create(req-body)
        return res.status(200).json({message: 'Contact info created', newContactInfo})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


async function updateContactInfo (req, res) {
    try {
        const contactInfo = await ContactInfo.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if(contactInfo) {
            return res.status(200).json({message: 'ContactInfo updated', contactInfo})
        }
        else {
            return res.status(404).send('ContactInfo not found')
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


async function deleteContactInfo(req, res) {
    try {
        const contactInfo = await ContactInfo.destroy({
            where: {
                id: req.params.id
            }
        })
        if(contactInfo) {
            return res.status(200).json({ message: 'Contact Info deleted'})
        }
        else {
            return res.status(404).json({message: 'Contact Info not found'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllContactInfos,
    getOneContactInfo,
    createContactInfo,
    updateContactInfo,
    deleteContactInfo
}

