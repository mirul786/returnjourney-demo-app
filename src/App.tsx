import React from "react";
import SearchBar from "./Component/SearchBar/SearchBar";
import ItemLists from "./Component/ItemLists/ItemLists";
import ItemsData from "./Component/ItemsData/ItemsData";
import './App.css'


const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Item Search App</h1>
      <ItemsData />
      <SearchBar />
      <ItemLists />
    </div>
  );
};

export default App;
