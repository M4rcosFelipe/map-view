import Map from "../components/Map";
import MarkerService from "../services/markersService";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { removeDuplicatedObjectsById, isAllEmpty } from "../utils";

interface Props {
  markersList: any[];
}

const Home = ({ markersList }: Props) => {
  const [markers, setMarkers] = useState(markersList);
  const [currentMapMarkers, setCurrentMapMarkers] = useState(markersList);
  const [count, setCount] = useState(0);

  function filter(searchValue: object, list: any[]) {
    const values = Object.values(searchValue);
    if (isAllEmpty(values)) {
      values;
      isAllEmpty(values);
      return list;
    }
    const fields = Object.entries(searchValue);

    const findedList = fields.flatMap(([key, value]) => {
      const findedMarker = list.filter((item) => item[key] == value);
      return findedMarker;
    });

    return removeDuplicatedObjectsById(findedList);
  }
  function handleFilter(searchValue: object, list: any[]) {
    const filtered = filter(searchValue, list);

    setCurrentMapMarkers(filtered);
    setCount(filtered.length);
  }

  return (
    <>
      <Map markersList={currentMapMarkers} />
      <Sidebar count={count} filter={handleFilter} list={markers} />
    </>
  );
};

export const getStaticProps = async () => {
  const markersList = await MarkerService.getAll();

  return {
    props: {
      markersList,
    },
    revalidate: 300,
  };
};

export default Home;
