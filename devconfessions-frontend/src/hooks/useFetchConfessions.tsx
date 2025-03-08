import { useState, useEffect } from "react";
import axios from "axios";
import { Confession } from "../App";

export const useFetchConfessions = (sortBy: "new" | "top") => {
  const [confessions, setConfessions] = useState<Confession[]>([]);

  const fetchConfessions = async () => {
    try {
      const { data } = await axios.get<Confession[]>(
        `${import.meta.env.VITE_API_URL}/confessions`,
        { params: { sort: sortBy } }
      );
      setConfessions(data);
    } catch (err) {
      console.error("Failed to fetch confessions:", err);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, [sortBy]);

  return { confessions, fetchConfessions };
};
