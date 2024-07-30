export const getContacts = (req, res) => {
  
    res.json({ message: 'Get all contacts' });
  };
  
  export const getContactById = (req, res) => {
    const { contactId } = req.params;
    
    res.json({ message: `Get contact with ID: ${contactId}` });
  };
  