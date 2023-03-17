import { invoke } from "@tauri-apps/api/tauri";

const ADD_FOLDER_TO_MODAL_NAME = "call_add_folder_to_model";

const addFolderToModal = async ({
  query,
  dirPath,
}: {
  dirPath: string;
  query: string;
}) => {
  const response = await invoke(ADD_FOLDER_TO_MODAL_NAME, { dirPath, query });
  console.log(response);
  return response;
};

export { addFolderToModal };
