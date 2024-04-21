import React, { useState } from 'react';
import Button from "components/Button";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import {getMyFriendsHistory, settle, nudge} from "../../services/friendService";
import {fetchCurrentUserEmailId} from "../../services/userService";

interface Friend {
  name: string;
  description: string;
  transactions: Transaction[];
}

interface Transaction {
  amount: number;
  type: 'Owe' | 'Paid' | 'Received' | 'Lent';
  groupName: string;
  date: string;
}

const MyFriends: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const emailId: any = fetchCurrentUserEmailId();
  const friends: any = getMyFriendsHistory(emailId);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const nudgeFriend = () => {
    //this will send a nudge email to the person who has to pay up
    nudge(emailId);
  }
  
  const settleWithFriend = () => {
    //this will settle with the person owes money
    settle(emailId);
  }

  return (
      <div className='mt-4 flex h-[calc(100vh-180px)] flex-1 flex-col px-4  sm:px-6 lg:mx-auto lg:px-8 xl:max-w-6xl'>
        <div className="mt-12 mb-6 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Friends
            </h2>
          </div>
        </div>
      {friends.map((friend:any, index:any) => (
        <div key={index} style={{ marginBottom: '10px' }} className='rounded border-b border-gray-200 shadow'>
          <button
            style={{
              width: '100%',
              padding: '10px',
              textAlign: 'left',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ddd',
              cursor: 'pointer'
            }}
            onClick={() => toggle(index)}
          >
            {friend.name}
          </button>
          {openIndex === index && (
          <div className='mt-4 mb-4 flex flex-1 flex-col px-4  sm:px-6 lg:mx-auto'>
            <div
              style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderTop: 'none'
              }}
            >
              {friend.description}
              <div className='float-right' style={{
                marginTop: '-8px'
              }}><Button onClick={()=>nudgeFriend()}>Nudge</Button></div>
              <div className='float-right' style={{
                marginTop: '-8px'
              }}><Button onClick={()=>settleWithFriend()}>Settle</Button></div>
            </div>
            
            <div className="mt-4 flex flex-col">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl">
                  Transaction History
                </h3>
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
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            Type
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            Group Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            Date
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {friend.transactions.map((transaction:any, idx:any) => (
                          <tr key={idx}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              ${transaction.amount}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {transaction.type}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {transaction.groupName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {transaction.date}
                            </td>

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
            </div>
             )}
        </div>
      ))}
    </div>
    );
  };

export default MyFriends;
