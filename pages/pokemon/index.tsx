// import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
// import { Pagination, CircularProgress, ListItemButton, ListItemAvatar, Avatar, ListItemText, Container, List } from '@mui/material';
// import { SportsBar } from '@mui/icons-material';

const INITIAL_PAGE_NUMBER = 1;

export default function MyList({ initialData }: any) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE_NUMBER);
  const [pagesCount, setPagesCount] = useState(3);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        // response = await fetch(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=10`);
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${page}`);

        const jsonData = await response.json();
        setIsLoading(false);
        setData(jsonData.results);
        console.log(typeof jsonData.count);
        setPagesCount((Math.ceil(+jsonData.count / 10)));
      } catch (err) {
        setIsLoading(false);
        setData([]);
      }
    }

    if (!isFirstRender) {
      getData();
    }

    setIsFirstRender(false);
  }, [page]);

  return (
    <div className="text-white">
      <div>
        <h4>SSR</h4>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data.map((beer: any) => (
              <div key={beer.id} onClick={() => { }}>
                {/* <div primary={beer.name} secondary={beer.url} /> */}
                <span>{beer.name}</span>
                <span>{beer.url}</span>
              </div>
            ))}
          </div>
        )}

        <div>
          {[1, 2, 3].map(item => (
            <span onClick={() => { setPage(item) }}>{item}</span>
          ))}
        </div>
        {/* <Pagination
          count={pagesCount}
          page={page}
          onChange={(_event: React.ChangeEvent<unknown>, page: number) => {
            setPage(page);
          }}
        /> */}
      </div>
    </div>
  );
}


// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  try {
    // const res = await fetch(`https://api.openbrewerydb.org/v1/breweries?page=${INITIAL_PAGE_NUMBER}&per_page=10`);
    // const initialData = await res.json();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${INITIAL_PAGE_NUMBER}`);
    const initialData = await res.json();

    console.log('dataSSR [0] SSR');
    console.log(initialData.results[0]);
    // Pass data to the page via props
    return { props: { initialData: initialData.results } };
  } catch (err) {
    console.log('err');
    console.log(err);
  }

  return { props: { initialData: [] } };

}