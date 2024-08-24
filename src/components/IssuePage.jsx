import { Badge, Flex, Avatar } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Issuedot from "../assets/Issuedot";
import { formatDistanceToNow } from "date-fns";
import Kebab from "../assets/Kebab";
import ReactMarkdown from "react-markdown";
import EmojisMenu from "../assets/EmojisMenu";
import Events from "./Events";
import Comments from "./Comments";

const IssuePage = () => {
  const [issueItem, setIssueItem] = useState({});
  const [eventItem, setEvent] = useState([]);
  const { number } = useParams();

  useEffect(() => {
    fetch(`https://api.github.com/repos/facebook/react/issues/${number}`)
      .then((response) => response.json())
      .then((issueItem) => setIssueItem(issueItem))
      .catch((error) => console.error("Error:", error));
  }, [number]);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/facebook/react/issues/${number}/timeline`
    )
      .then((response) => response.json())
      .then((eventItem) => setEvent(eventItem))
      .catch((error) => console.error("Error:", error));
  }, [number]);

  if (Object.keys(issueItem).length === 0)
    return <div className=''>Something went wrong with fetch...</div>;

  return (
    <>
      <div className='mainContainer h-full w-[1216px]'>
        <div className='mb-3'>
          <h1 className='flex-auto mb-2 mr-0 whitespace-break-spaces text-[32px] text-[#FBFCFD]'>
            {issueItem.title}{" "}
            <span className='font-thin'>#{issueItem.number}</span>
          </h1>
          <div className='flex gap-1 justify-center items-center mb-4 pb-2 border-1 border-b border-[#7a828e]'>
            <Flex className='mb-2'>
              <Badge className='flex border border-solid rounded-3xl border-[#09b43a] bg-[#09b43a] text-[#0A0C10] w-[80.63px] h-[32px] mr-2 pr-[5px] pl-[12px] pb-0 pt-0 justify-center items-center'>
                <span className='flex  text-[14px] mr-1'>
                  <Issuedot color='#FFFFF' /> <div className='ml-1'>Open</div>
                </span>
              </Badge>
            </Flex>
            <div className='flex-auto text-[#F0F3F6] mb-2 '>
              <a className='font-medium items-center justify-center'>
                {issueItem?.user.login}
              </a>{" "}
              {`opened this issue ${formatDistanceToNow(
                new Date(issueItem.created_at),
                {
                  addSuffix: true,
                }
              )} · ${
                issueItem.comments === 1
                  ? `${issueItem.comments} comment`
                  : `${issueItem.comments} comments`
              } `}
            </div>
          </div>
          <div className='discussion_bucket flex'>
            <div className='layout_main flex '>
              <div>
                <div className='flex'>
                  <Flex gap='2'>
                    <Avatar
                      className='border border-[#ffffffe6]'
                      src={`${issueItem.user.avatar_url}`}
                      fallback='A'
                      radius='full'
                    />
                  </Flex>
                  <ul
                    role='list'
                    className='ml-4 border border-[#7a828e] rounded-md'
                  >
                    <div className='flex  text-[#f0f3f6] text-[14px] bg-[#272b33]  w-[838px] h-[36.98px] justify-between items-center px-4'>
                      <div className='flex'>
                        <a className=' font-medium mr-1'>
                          {issueItem.user.login}
                        </a>
                        {` commented
                  ${formatDistanceToNow(new Date(issueItem.created_at), {
                    addSuffix: true,
                  })}`}
                      </div>
                      <div className='flex'>
                        <Kebab />
                      </div>
                    </div>
                    <li className='flex justify-between gap-x-6  bg-[rgb(10,12,16)] border-t  border-[#7a828e] w-[838px]'>
                      <div className='edit-comment-hide flex-row p-4  w-full'>
                        <div className='issue-body  flex  text-[14px] text-[#f0f3f6] w-full'>
                          <ReactMarkdown className='prose-p:mb-4 prose-p:mt-0 w-full'>
                            {issueItem.body}
                          </ReactMarkdown>
                        </div>
                        <div className='reaction flex flex-auto '>
                          <EmojisMenu />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul>
                    {eventItem.map((eventItem) => (
                      <li key={eventItem.id}>
                        {eventItem.event === "commented" ? (
                          <Comments eventItem={eventItem} />
                        ) : (
                          <Events eventItem={eventItem} />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuePage;
