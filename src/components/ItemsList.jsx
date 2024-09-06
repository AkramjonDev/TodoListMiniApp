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
    <ul className="mt-10">
      {items.map((item) => {
        const { id, content, completed } = item;
        return (
          <li key={id} className="flex justify-between w-full mb-3">
            <div className="flex items-center gap-1">
              <input
                onClick={() => checked(id)}
                id={`default-checkbox ${id}`}
                defaultChecked={completed}
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 text-2xl"
              />
              {editItemId === id ? (
                <input
                  type="text"
                  value={editContent}
                  onChange={handleEditChange}
                  className="ms-2 text-sm font-medium dark:text-[black] text-white"
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
            <div>
              <button
                type="button"
                onClick={() => handleDelete(id)}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
              >
                Delete <FontAwesomeIcon icon={faTrash} />
              </button>
              {editItemId === id ? (
                <button className="focus:outline-none text-white bg-[#427D9D] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " onClick={() => handleEditSubmitLocal(id)}>
                  save
                </button>
              ) : (
                <button
                  className="focus:outline-none text-white bg-[#427D9D] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                  onClick={() => handleEditClick(id)}
                >
                  Edit.
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
