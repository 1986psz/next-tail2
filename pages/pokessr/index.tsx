import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { PokeTable } from "../../ui/page-directory/components/PokeTable";
import { Loading } from "../../ui/page-directory/components/Loading";

const INITIAL_PAGE_NUMBER = 1;

export default function MyList({ initialData }: any) {
  const isFirstRender = useRef(true);
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

    if (isFirstRender.current === false) {
      getData();
    }

    isFirstRender.current = false;
  }, [page]);

  return (
    <div className="text-white">
      <div>
        <h4 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-white text-center">SSR</h4>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-56 rounded-lg bg-black dark:bg-gray-800 dark:border-gray-700">
            <Loading />
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <PokeTable data={data} />
          </div>
        )}
        <div className="text-center mt-5">
          <Pagination
            layout="pagination"
            currentPage={page}
            onPageChange={(page) => setPage(page)}
            totalPages={pagesCount}
          />
        </div>

      </div>
    </div>
  );

}


// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  try {
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