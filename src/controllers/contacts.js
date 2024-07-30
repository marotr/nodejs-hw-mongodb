import createHttpError from "http-errors";

export const getContacts = async (req, res, next,) => {
    try {
        const contacts = await getContacts();
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
    const contact = await getContactById(contactId);

    if(!contact)
        {throw createHttpError (404, 'Contact not found')
        }
    
    res.json({
        status:200,
        message: `Get contact with ID: ${contactId}`,
    data: contact, });
  };
  