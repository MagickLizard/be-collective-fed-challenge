
import React from 'react'

const FileIcons = ({ selected, label, type, size, onChange }) => {
 const renderItem = () => {
  if ( type === "folder") {
   return (
    <div>
     <span className={`fa files__icon ${selected ? 'fa-chevron-down' : 'fa-chevron-right'} `} onClick={() => onChange(!selected)}/>
     <span className={`fa files__icon fa-folder`}/>
     <span className="files__label">{label}</span>
    </div>
   ) 
  }
  
  // I'm assuming that the size returned is in bytes.
  if (type === "file") {
   return (
    <div>
     <span className={`fa files__icon fa-file`}/>
     <span className="files__label">{label} {`${(size / 1000).toFixed(3)} KB`}</span>
    </div>
   )
  }
 }
 return (
     <div className="files">
      {renderItem()}     
   </div>
 )
}

export default FileIcons