interface PokeTableProps {
  data: any[];
}

export function PokeTable({ data }: PokeTableProps) {
  return (
    <table className="w-full text-sm text-left text-white dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="bg-black text-white">
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            URL
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((pokemon: any) => (
          <tr key={pokemon.url} className="bg-black border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
              {pokemon.name}
            </th>
            <td className="px-6 py-4">
              {pokemon.url}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )


}