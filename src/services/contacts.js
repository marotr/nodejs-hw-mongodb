import Contact from '../models/contact.js';

// to fetch all contacts
export function findAllContacts(){
  return Contact.find()
}


// to fetch contacts by ID
export function findContactById (contactId)  {
 return Contact.findById(contactId);
};

// to create a new contact
export function createContact (payload) {
  return Contact.create(payload);
}

// to update a contact
export function updateContact (contactId, payload){
return Contact.findByIdAndUpdate (contactId, payload,{
  new:true,
  upsert:true,
  includeResultMetadata:true,
});
}

// to delete a contact
export function deleteContact (contactId) {
  return Contact.findByIdAndDelete(contactId)

};
