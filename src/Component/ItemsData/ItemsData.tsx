import React, { act, useEffect, useState } from "react";
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
        const apiResponse = await fetch(
          `https://o9ikkg4p9l.execute-api.us-east-1.amazonaws.com/test/get-cities`
        );

        let data;

        if (apiResponse?.ok) {
          data = await apiResponse.json();
        } else {
          data = MockItems;
        }

        if (!data || data.length === 0) {
          data = MockItems;
        }

        dispatch(setItems(data));
      } catch (err) {
        console.log("Error fetching items:", err);
        setError("Failed to load items from API. Using local data.");
        dispatch(setItems(MockItems));
      } finally {
        act(() => {
          setLoading(false);
        });
      }
    };

    fetchItems();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return null;
};

export default LoadItems;
