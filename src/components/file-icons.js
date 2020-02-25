
import React from 'react'

const FileIcons = ({ selected, label, type, onChange }) => {
 const renderItem = () => {
  if ( type === "folder") {
   return (
    <div>
     <span className={`fa files__icon ${selected ? 'fa-chevron-down' : 'fa-chevron-right'} `} onClick={() => onChange(!selected)}/>
     <span>{label}</span>
    </div>
   ) 
  }
 }
 return (
     <div>
      {renderItem()}     
   </div>
 )
}

export default FileIcons