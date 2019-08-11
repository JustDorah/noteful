//from thinkful's noteful-client
export const getNotesForFolder = (notes = [], folderId) =>
  !folderId ? notes : notes.filter(note => note.folderId === folderId);
