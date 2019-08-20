// export function homeNotesFolderNotes() {
//   if (this.props.match.path === "/") {
//     return this.context.ApiNotes;
//   } else if (this.props.match.path === "/folder/:folderId") {
//     return this.context.ApiFolder.filter(
//       notes => notes.folderId === this.props.match.params.folderId
//     );
//   } else {
//     return this.context.ApiNotes;
//   }
//}

//if page refreshes then I get an error
export function dateModified(notes) {
  const modified = notes;
  const moment = require("moment");
  let d1 = moment(modified);
  let date = d1.format("Do MMM YYYY");

  return date;
}
