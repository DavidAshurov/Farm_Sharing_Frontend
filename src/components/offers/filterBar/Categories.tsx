import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";

interface Props {
    chosenCategory: string,
    setChosenCategory: (value: (((prevState: string) => string) | string)) => void,
}

const Categories = ({chosenCategory, setChosenCategory}: Props) => {
    const categories = ['All products', 'Vegetables', 'Fruits', 'Herbs', 'Diary', 'Pantry']

    const handleCategory = (event, newCategory) => {
        setChosenCategory(newCategory === null ? 'All products' : newCategory)
    }
    return (
        <ToggleButtonGroup
            value={chosenCategory}
            exclusive={true}
            onChange={handleCategory}
            color={"secondary"}
        >
            <Box>
                <>
                    {categories.map(cat =>
                        <ToggleButton key={cat}
                                      value={cat}
                                      size={"small"}
                                      sx={{
                                          borderRadius: '1.5rem',
                                          px: '0.75rem',
                                          color: 'black',
                                          mr: '1rem',
                                          mt:'0.7rem',
                                          fontWeight: 'bold',
                                          '&.Mui-selected': {
                                              backgroundColor: 'secondary.main',
                                              color: 'white',
                                              '&:hover': {
                                                  backgroundColor: 'secondary.dark'
                                              }
                                          },
                                          '&:hover': {
                                              borderColor: 'secondary.main'
                                          }
                                      }}>
                            {cat}
                        </ToggleButton>)}
                </>
            </Box>
        </ToggleButtonGroup>
    );
};

export default Categories;