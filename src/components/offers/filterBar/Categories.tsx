import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import type {Dispatch, SetStateAction} from "react";

interface Props {
    offersRequestParams: OffersRequest,
    setOffersRequestParams: Dispatch<SetStateAction<OffersRequest>>,
}

const Categories = ({offersRequestParams, setOffersRequestParams}: Props) => {
    const categories = ['All products', 'Vegetables', 'Fruits', 'Herbs', 'Dairy', 'Pantry']

    const handleCategory = (_, newCategory) => {
        setOffersRequestParams(prev => ({...prev, category: newCategory === null ? 'All products' : newCategory}))
    }
    return (
        <ToggleButtonGroup
            value={offersRequestParams.category}
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
                                          mr: '0.5rem',
                                          mt: '0.7rem',
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