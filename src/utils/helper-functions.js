//from thinkful's noteful-client
export const getNotesForFolder = (notes = [], folderId) =>
  !folderId ? notes : notes.filter(note => note.folderId === folderId);

export function homeNotesFolderNotes() {
  if (this.props.match.path === "/") {
    return this.context.ApiNotes;
  } else if (this.props.match.path === "/folder/:folderId") {
    return this.context.ApiFolder.filter(
      notes => notes.folderId === this.props.match.params.folderId
    );
  } else {
    return this.context.ApiNotes;
  }
}
