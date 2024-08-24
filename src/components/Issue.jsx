import { useEffect } from "react";
import Issuedot from "../assets/Issuedot.jsx";
import Checkmark from "../assets/Checkmark.jsx";
// import SelectMenuHeader from "./SelectMenuHeader.jsx";
import "@radix-ui/themes/styles.css";
import { Flex, Badge } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import Dropdown from "../assets/Dropdown.jsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssues } from "../store/counterSlice.js";

const Issue = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state) => state.issues.issues);

  useEffect(() => {
    // fetch("https://api.github.com/repos/facebook/react/issues")
    //   .then((response) => response.json())
    //   .then((issue) => setIssue(issue))
    //   .catch((error) => console.error("Error:", error));
    dispatch(fetchIssues());
  }, [dispatch]);

  return (
    <>
      <ul role='list' className='p-5 '>
        <div
          className='flex justify-between p-4 bg-[rgb(39,43,51)]
 border border-b-2 text-sm  leading-6 my-[-1px] text-[#f0f3f6] rounded-t-md w-[1216px] h-[55px] border-[#7a828e] '
        >
          <div className='flex flex-auto gap-x-1.5  text-[#fbfcfd] '>
            <a
              href=''
              className='font-semibold flex items-center justify-center gap-x-2 '
            >
              <Issuedot color='#ffff' />
              670 Open
            </a>
            <a
              href=''
              className='pl-2 flex items-center justify-center gap-x-2'
            >
              <Checkmark />
              12,419 Closed
            </a>
          </div>

          <div className=' flex flex-auto justify-end'>
            <div className='flex items-center px-4'>
              Author <Dropdown />
            </div>
            <div className='flex items-center px-4'>
              Label <Dropdown />
            </div>
            <div className='flex items-center px-4'>
              Projects <Dropdown />
            </div>
            <div className='flex items-center px-4'>
              Milestones <Dropdown />
            </div>
            <div className='flex items-center px-4'>
              Assignee <Dropdown />
            </div>
            <div className='flex items-center pl-4'>
              Sort <Dropdown />
            </div>
          </div>
        </div>
        {issues.map((issue) => (
          <li
            key={issue.id}
            className='flex justify-between gap-x-6  bg-[rgb(10,12,16)]
 border-l border-r border-b hover:bg-[rgb(39,43,51)] border-[#7a828e] w-[1216px] '
          >
            <div className='flex min-w-0 gap-x-2 '>
              <div className='flex-shrink-0 items-start pt-3 pl-3  '>
                <Issuedot color='#28a745' />
              </div>
              <div className='min-w-0 flex-row py-2'>
                <Link
                  to={`issue/${issue.number}`}
                  className='flex font-semibold leading-6 text-white text-custom'
                >
                  {issue.title}{" "}
                </Link>
                <Flex>
                  {issue.labels.map((label) => (
                    <Badge
                      variant='outline'
                      highContrast
                      key={label.id}
                      style={{
                        color: `#${label.color}`,
                        borderColor: `#${label.color}`,
                      }}
                      className='border border-solid rounded-3xl ml-1  '
                    >
                      {label.name}
                    </Badge>
                  ))}
                </Flex>

                <p className='mt-1 truncate text-xs leading-5 text-[#f0f3f6]'>
                  #{issue.number}
                  {"  "}
                  opened{"  "}
                  {formatDistanceToNow(new Date(issue.created_at), {
                    addSuffix: true,
                  })}
                  {"  "}
                  by {"  "}
                  {issue.user.login}
                </p>
              </div>
              <div className='flex-shrink-0  flex pt-2 text-right pr-4 min-w-[303.5px]  '>
                <span className='ml-2 flex-1 flex-shrink-0'></span>
                <span className='ml-2 flex-1 flex-shrink-0'></span>
                <span className='ml-2 flex-1 flex-shrink-0'></span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Issue;
