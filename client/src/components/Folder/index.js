import React from "react";

const Folder = (props) => {
  const { folder } = props;
  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };

  return (
    <section className="listComponent">
      <div>
        <h2>{folder.folderName}</h2>
        {/* <p>
          {new Date(parseInt(folder.folderDate)).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </p> */}
      </div>
      
    </section>
  );
};

export default Folder;
