import React from "react";

interface SchemaEditorProps {
  message: string;
}

const SchemaEditor: React.FC<SchemaEditorProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default SchemaEditor;
