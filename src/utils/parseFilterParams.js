const parseContactType = (type) => {
 
  if (typeof type === 'string') {
    const validTypes = ['personal', 'home', 'work'];
    return validTypes.includes(type) ? type : undefined; 
  }
  return undefined;
};

const parseIsFavourite = (isFavourite) => {
  
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
  return undefined; 
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
