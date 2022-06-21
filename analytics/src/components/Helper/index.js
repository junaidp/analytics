export const replaceSpaceWithCharacter = (string = "", character = "_") => {
    return string.replace(/ /g, character);
  };
  
  
  
  export const toTitleCase = phrase => {
      return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };
  
  