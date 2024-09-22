import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "../../redux/itemSlice";
import { AppDispatch } from "../../redux/store";
import { MockItems } from "../MockItems/MockItems";

const LoadItems: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Attempt to fetch data from API
        const apiResponse = await fetch(
          `https://o9ikkg4p9l.execute-api.us-east-1.amazonaws.com/test/get-cities`
        );

        let data;

        if (apiResponse?.ok) {
          // Parse API response
          data = await apiResponse.json();
        } else {
          // API failed, use local data
          data = MockItems;
        }

        // If no data from API, use MockItems array from MockItems.tsx
        if (!data || data.length === 0) {
          data = MockItems;
        }

        // Dispatch the data (whether from API or mock)
        dispatch(setItems(data));
      } catch (err) {
        // On any error, use mock data and set error message
        console.error("Error fetching items:", err);
        setError("Failed to load items from API. Using local data.");
        dispatch(setItems(MockItems));
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
