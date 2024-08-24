/* eslint-disable react/prop-types */
import EmojisMenu from "../assets/EmojisMenu";
import { Flex, Avatar } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import Kebab from "../assets/Kebab";
import ReactMarkdown from "react-markdown";

const Comments = ({ eventItem }) => {
  const {
    created_at,
    actor: { avatar_url, login },
    body,
  } = eventItem;
  return (
    <div className='discussion_bucket flex'>
      <div className='layout_main flex '>
        <Flex gap='2'>
          <Avatar
            className='border border-[#ffffffe6]'
            src={`${avatar_url}`}
            fallback='A'
            radius='full'
          />
        </Flex>
        <div>
          <ul role='list' className='ml-4 border border-[#7a828e] rounded-md'>
            <div className='flex  text-[#f0f3f6] text-[14px] bg-[#272b33]  w-[838px] h-[36.98px] justify-between items-center px-4'>
              <div className='flex'>
                <a className=' font-medium mr-1'>{login}</a>
                {` commented
        ${formatDistanceToNow(new Date(created_at), {
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
                    {body}
                  </ReactMarkdown>
                </div>
                <div className='reaction flex flex-auto '>
                  <EmojisMenu />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comments;
