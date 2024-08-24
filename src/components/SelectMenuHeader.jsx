import { Popover, Button, Flex, Box } from "@radix-ui/themes";

// eslint-disable-next-line react/prop-types
const SelectMenuHeader = ({ byWhat }) => {
  return (
    <Popover.Root>
      <Flex direction={"row"} justify={"between"} gap={3}>
        <Box>
          <h3 className='text-sm font-bold'>Filter by {byWhat}</h3>
          <Popover.Close>
            <Button>x</Button>
          </Popover.Close>
        </Box>
      </Flex>
    </Popover.Root>
  );
};

export default SelectMenuHeader;
