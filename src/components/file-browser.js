import React from 'react'
import FileIcons from './file-icons'

// Recursive Files list
const FileBrowser = ({ files, selectedFolders, onChange }) => {

 const handleFileClick = (selectedfolderId) => {
  if (selectedFolders[selectedfolderId]) {
   delete selectedFolders[selectedfolderId];
  } else { 
   selectedFolders[selectedfolderId] = {}
  }
  onChange(selectedFolders)
 }

 const handleChildChange = (folderId, subSelections) => {
  selectedFolders[folderId] = subSelections;
  onChange(selectedFolders);
 }

 return (
  <div className="file-browser">
    {files && files.map((files, index) => (
    <ul key={`id-${index}`}>
     <FileIcons
      selected={selectedFolders[`id-${index}`]}
      label={files.name}
      type={files.type}
      size={files.size}
      onChange={() => { handleFileClick(`id-${index}`) }}
     />
     {(files.children && selectedFolders[`id-${index}`]) &&
      <FileBrowser
       files={files.children}
       selectedFolders={selectedFolders[`id-${index}`]}
       onChange={(subSelections) => handleChildChange(`id-${index}`, subSelections)}
      />
     }
    </ul>
   ))}
  </div>
 )
}

export default FileBrowser