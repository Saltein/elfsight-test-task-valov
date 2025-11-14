import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [statuses, setStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [species, setSpecies] = useState([]);

  const [filters, setFilters] = useState('');

  async function getAllParams(pageCount) {
    if (!pageCount) return;

    const statuses = new Set();
    const genders = new Set();
    const species = new Set();

    try {
      for (let page = 1; page <= pageCount; page++) {
        const { data } = await axios.get(`${API_URL}?page=${page}`);

        data.results.forEach((char) => {
          statuses.add(char.status);
          genders.add(char.gender);
          species.add(char.species);
        });
      }

      setStatuses([...statuses]);
      setGenders([...genders]);
      setSpecies([...species]);
    } catch (e) {
      console.error('Ошибка при загрузке параметров', e);
      setIsError(true);
    }
  }

  const fetchData = useCallback(
    async (url) => {
      setIsFetching(true);
      setIsError(false);

      const prefix = url.toString().includes('?') ? '' : '?';
      const fullUrl = url + prefix + filters;

      axios
        .get(fullUrl)
        .then(({ data }) => {
          setIsFetching(false);
          setCharacters(data.results);
          setInfo(data.info);
        })
        .catch((e) => {
          setIsFetching(false);
          setIsError(true);
          console.error(e);
        });
    },
    [filters]
  );

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  useEffect(() => {
    getAllParams(info?.pages);
  }, [info]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      statuses,
      genders,
      species,
      filters,
      setFilters,
      API_URL
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      fetchData,
      statuses,
      genders,
      species,
      filters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
