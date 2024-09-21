import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "../../redux/itemSlice";
import { AppDispatch } from "../../redux/store";

const LoadItems: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Simulate fetching from an API
        const response = await new Promise<{ id: number; name: string }[]>(
          (resolve) =>
            setTimeout(
              () =>
                resolve([
                  { id: 1, name: "Apple" },
                  { id: 2, name: "Banana" },
                  { id: 3, name: "Cherry" },
                ]),
              1000
            )
        );

        dispatch(setItems(response));
      } catch (err) {
        setError("Failed to load items");
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return null;
};

export default LoadItems;
