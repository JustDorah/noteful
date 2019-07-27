## Notes

- date formatter used is [moment](https://momentjs.com/)

  - momentjs.com

- Each route should have a header, main section, and a sidebar section

- Every route will have the same header section, - the app's title should be a link to the main route.

- The state will be supplied below in a JSON object and contains an array of folders and an array of notes.

- Set the state inside the main App component. (We'll use an API call to populate this state in a future checkpoint.)

- The main route:

-         Should be displayed when the path is "/"
-         The main section will display all of the available notes
-         Each note should show it's name and modified date
-         The sidebar will display a list of folders with none selected

- The dynamic folder route:

  -     Should be displayed when the path is /folder/<with-a-folder-id-here>
  -     The folder-id will reference an id of one of the folders in state
  -     The main section should display only the notes that are "in" the selected folder
  - The sidebar should display the folder list with the selected folder highlighted

- The dynamic note route:
  -     Should be displayed when the path is /note/<with-a-note-id-here>
  - The note-id will reference an id of one of the notes in state
  - The main section should display the currently selected notes name, modified date and content
  - The sidebar should the folder of the currently selected note as well as a "back" button.

---

# Knowledge Gained

1. Pathway to route with props

- A component as a prop, passing a props:

      <MainPage mainNotes={mainNotes} mainFolders={mainFolders} />

- A route to the above component, no props:

      <Route exact path="/" component={MainPage} />

- The above route with a component, passing props:

      <Route
        exact path="/"

        render={() =>
        (
          <MainPage
            mainNotes={mainNotes} mainFolders={mainFolders}
            />
          )
        }
        />

  then route, then route with props

2. [Handle event with a div container.

- the event handler

        handleFolderClick = (e, dummyNotes) => {e.preventDefault();

         console.log("hi, this was clicked", e.currentTarget.dataset.div_id);

         let clickedFolder = e.currentTarget.dataset.div_id;      console.log(clickedFolder, "the folder that has been clicked");
          };

- in the div

      onClick={this.handleFolderClick}

3. Using map and filter: an example

- `return [fN.id, sameId];` makes it difficult to get the access the information. Find a better way.

        const folderNotes = dummyFolders.map(fN => {

        let sameId = dummyNotes.filter(notes => notes.folderId === fN.id);

        return [fN.id, sameId];
          }
        );

        console.log(folderNotes);

4. Learn more about routerProps

- use routerProps to get the folderId and then use to filter notes.
- console.log(this.props, "the props");

---

- In Chrome 67, if you have the DevTools open ( F12 ), you can end the infinite loop without killing the whole tab:

- https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
