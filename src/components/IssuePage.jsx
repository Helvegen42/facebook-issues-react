import { Badge, Flex, Avatar } from "@radix-ui/themes";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Issuedot from "../assets/Issuedot";
import { formatDistanceToNow } from "date-fns";
import Kebab from "../assets/Kebab";
import ReactMarkdown from "react-markdown";
import EmojisMenu from "../assets/EmojisMenu";
import Events from "./Events";
import Comments from "./Comments";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssue, fetchTimeline } from "../store/counterSlice";

const IssuePage = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const issue = useSelector((state) => state.issues.issue);
  const timeline = useSelector((state) => state.issues.timeline);

  useEffect(() => {
    dispatch(fetchIssue({ number }));
  }, [number, dispatch]);

  useEffect(() => {
    dispatch(fetchTimeline({ number }));
  }, [number, dispatch]);

  if (Object.keys(issue).length === 0)
    return <div className=''>Something went wrong with fetch...</div>;

  return (
    <>
      <div className='mainContainer h-full w-[1216px]'>
        <div className='mb-3'>
          <h1 className='flex-auto mb-2 mr-0 whitespace-break-spaces text-[32px] text-[#FBFCFD]'>
            {issue.title} <span className='font-thin'>#{issue.number}</span>
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
                {issue?.user.login}
              </a>{" "}
              {`opened this issue ${formatDistanceToNow(
                new Date(issue.created_at),
                {
                  addSuffix: true,
                }
              )} · ${
                issue.comments === 1
                  ? `${issue.comments} comment`
                  : `${issue.comments} comments`
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
                      src={`${issue.user.avatar_url}`}
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
                        <a className=' font-medium mr-1'>{issue.user.login}</a>
                        {` commented
                  ${formatDistanceToNow(new Date(issue.created_at), {
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
                            {issue.body}
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
                    {timeline.map((eventItem) => (
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
