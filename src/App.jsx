import { useEffect, useState } from "react";
import Form from "./components/Form";
import ItemsList from "./components/ItemsList";
import { toast } from "react-toastify";

const local = () => {
  return JSON.parse(localStorage.getItem("item")) || [];
};

const themes = {
  light: "light",
  dark: "dark",
};

const darkLocal = () => {
  return localStorage.getItem("mode") || themes.light;
};

function App() {
  const [items, setItems] = useState(local());
  const [theme, setTheme] = useState(darkLocal());
  const [editItem, setEditItem] = useState(null);

  const darkMode = () => {
    setTheme((prev) => {
      const newTheme = prev === themes.light ? themes.dark : themes.light;
      localStorage.setItem("mode", newTheme);
      return newTheme;
    });
  };

  const deleteNotify = () => toast.error("you deleted item !");

  const handleDelete = (id) => {
    const remove = items.filter((b) => b.id !== id);
    setItems(remove);
    deleteNotify();
  };

  const addNewItem = (add) => {
    setItems((prev) => {
      return [...prev, add];
    });
    toast.success("you added Todo !");
  };

  const checked = (id) => {
    setItems((prev) => {
      return prev.map((items) => {
        if (items.id === id) {
          return { ...items, completed: !items.completed };
        } else {
          return items;
        }
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(items));
    if (theme === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [items, theme]);

  const handleEdit = (id) => {
    setEditItem(id);
  };

  const handleEditSubmit = (id, newContent) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, content: newContent };
        } else {
          return item;
        }
      });
    });
    setEditItem(null);
  };

  return (
    <div className="bg-slate-200 h-screen grid place-items-center dark:bg-[#363062] ">
      <div className="bg-white w-[520px] p-8 dark:bg-[#2B2A4C] dark:text-[white] rounded-xl">
        <div className="toggler flex justify-center mb-4">
          <label className="relative inline-flex items-center justify-center cursor-pointer">
            <input
              defaultChecked={theme === "light" ? false : true}
              onChange={darkMode}
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <h1 className="text-3xl text-center mb-8">Grocery Bud</h1>
        <Form addNewItem={addNewItem} />
        {items && (
          <ItemsList
            items={items}
            handleDelete={handleDelete}
            checked={checked}
            editItem={editItem}
            handleEdit={handleEdit}
            handleEditSubmit={handleEditSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
