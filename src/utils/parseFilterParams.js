// const parseContactType = (type) => {
//   const isString = typeof type === 'string';
//   if (!isString) return;
//   const isContactType = (type) => ['personal', 'home', 'work'].includes(type);

//   if (isContactType(type)) return type;
// };

// const parseIsFavourite = (isFavourite) => {
//   if (typeof isFavourite === 'boolean') {
//     return isFavourite;
//   }
//   return null;
// };

// export const parseFilterParams = (query) => {
//   const { type, isFavourite } = query;

//   const parsedContactType = parseContactType(type);
//   const parsedIsFavourite = parseIsFavourite(isFavourite);

//   return {
//     type: parsedContactType,
//     isFavourite: parsedIsFavourite,
//   };
// };


const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const validTypes = ['personal', 'home', 'work'];
  return validTypes.includes(type) ? type : undefined;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
  return null;
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
