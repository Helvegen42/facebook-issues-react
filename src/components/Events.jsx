/* eslint-disable react/prop-types */
import EmojisMenu from "../assets/EmojisMenu";
import { Flex, Avatar, Badge } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";

const Events = ({ eventItem }) => {
  const {
    created_at,
    event,
    actor: { avatar_url, login },
    label,
    state_reason,
  } = eventItem;

  const renderEventBody = () => {
    switch (event) {
      case "labeled":
        return (
          <>
            <p>added the</p>
            <Flex>
              <Badge
                variant='outline'
                highContrast
                style={{
                  color: `#${label.color}`,
                  borderColor: `#${label.color}`,
                }}
                className='border border-solid rounded-3xl ml-1 '
              >
                {label.name}
              </Badge>
            </Flex>
            <p className='ml-1'>label</p>
          </>
        );

      case "marked_as_duplicate":
        return <p>marked as duplicate of another issue</p>;

      case "closed":
        return (
          <>
            <p>closed as</p> <p className='underline ml-1'>{state_reason}</p>
          </>
        );

      default:
        return <p>event</p>;
    }
  };

  return (
    <div className='flex ml-14'>
      <div className='flex border-r border-[#7a828e] h-[64px] w-[16px] relative'>
        <div className='flex absolute top-[20px] left-[3px]'>
          <EmojisMenu />
        </div>
      </div>
      <div className='flex  items-center justify-center ml-5 text-[14px] text-[#FBFCFD] '>
        <div>
          <Flex>
            <Avatar
              className='border border-[#ffffffe6] size-6'
              src={`${avatar_url}`}
              fallback='A'
              radius='full'
            />
          </Flex>
        </div>
        <a className='ml-1 font-medium'>{login}</a>
        <div className='flex mx-1'>{renderEventBody()}</div>
        <a>
          {formatDistanceToNow(new Date(created_at), {
            addSuffix: true,
          })}
        </a>
      </div>
    </div>
  );
};

export default Events;
