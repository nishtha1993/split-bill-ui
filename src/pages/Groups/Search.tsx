import React, { useState } from 'react';
import Button from "components/Button";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import {searchExpense, searchGroup} from "../../services/searchService";

interface Item {
  type: string;
  group: string;
  searchKeyword: string,
  date: string;
}

 const Searchs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  const data: any = searchExpense(searchTerm);

  const handleSearch = () => {
    const results = data.filter((item: any) => 
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleMoreDetails = (item: Item) => {
    // Here you would handle more complex logic or navigation
    console.log('More details: ', item);
  };

  return (
    <div className='mt-4 flex h-[calc(100vh-180px)] flex-1 flex-col px-4  sm:px-6 lg:mx-auto lg:px-8 xl:max-w-6xl'>
        <div className="flex justify-between space-x-4">
          <div className="flex-1 flex">
              <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded border-b border-gray-200 shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
            <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
              >Type</th>
              <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
              >Found</th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
              >Group</th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
              >Date</th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((item, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{item.type}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{item.searchKeyword}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{item.group}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{item.date}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Link to={`/group/}`}>
                    <Button
                      type="link"
                      rightIcon={
                        <ChevronRightIcon className="w-5" />
                      }
                    >
                      More Details{" "}
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Searchs;
