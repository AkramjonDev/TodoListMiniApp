import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function ItemsList({ items, handleDelete, checked, handleEditSubmit }) {
  const [editContent, setEditContent] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditClick = (id) => {
    setEditItemId(id);
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setEditContent(selectedItem.content);
    }
  };

  const handleEditSubmitLocal = (id) => {
    handleEditSubmit(id, editContent);
    setEditContent("");
    setEditItemId(null);
  };

  return (
    <ul className="mt-10 w-full">
      {items.map((item) => {
        const { id, content, completed } = item;
        return (
          <li
            key={id}
            className="flex flex-col sm:flex-row justify-between w-full mb-3 items-start sm:items-center"
          >
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                onClick={() => checked(id)}
                id={`default-checkbox ${id}`}
                defaultChecked={completed}
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              {editItemId === id ? (
                <input
                  type="text"
                  value={editContent}
                  onChange={handleEditChange}
                  className="ms-2 text-sm font-medium dark:text-black text-gray-900 flex-1"
                />
              ) : (
                <label
                  htmlFor={`default-checkbox ${id}`}
                  className={`${
                    completed && "line-through"
                  } ms-2 text-sm font-medium text-gray-900 dark:text-gray-300`}
                >
                  {content}
                </label>
              )}
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                type="button"
                onClick={() => handleDelete(id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Delete <FontAwesomeIcon icon={faTrash} />
              </button>
              {editItemId === id ? (
                <button
                  className="text-white bg-[#427D9D] font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => handleEditSubmitLocal(id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="text-white bg-[#427D9D] font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => handleEditClick(id)}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ItemsList;
