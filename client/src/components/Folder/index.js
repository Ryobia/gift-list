import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_FOLDER } from "../../utils/queries";

const Folder = (props) => {

  const { folder } = props;
  const {
    error: folderError,
    data: folderData,
    loading: folderLoading,
  } = useQuery(QUERY_FOLDER, {
    variables: { _id: folder._id },
  });
  let dateOptions = {
    hour: "numeric",
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    minute: "2-digit",
  };
if (folderData) {
  return (
    <section className="listComponent">
      <div>
        <h2>{folderData.folder.folderName}</h2>
        {/* <p>
          {new Date(parseInt(folderData.folder.folderDate)).toLocaleDateString(
            "en-US",
            dateOptions
          )}
        </p> */}
      </div>
      
    </section>
  );
}
};

export default Folder;
