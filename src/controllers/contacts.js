import createHttpError from "http-errors";

import { getContacts as fetchContacts, getContactById as fetchContactById,createContact } from "../services/contacts";

export const getContacts = async (req, res, next,) => {
    try {
        const contacts = await fetchContacts();
        res.json({
            status:200,
            message: 'Get all contacts' ,
        data:contacts});
        
    } catch (error) {
        next(error)
        
    }
  
    
  };
  
  export const getContactById = async(req, res,) => {
    const { contactId } = req.params;
    const contact = await fetchContactById(contactId);

    if(!contact)
        {throw createHttpError (404, 'Contact not found')
        }
    
    res.json({
        status:200,
        message: `Get contact with ID: ${contactId}`,
    data: contact, });
  };

  export const createContactController = async (req, res, next) =>{
    try {
        const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
      });
        
    } catch (error) {
        next (error);
        
    } 
    

  };
  