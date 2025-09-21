import {Box, Slider, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {useDebounce} from "../../../utils/functions.ts";

interface Props {
    offersRequestParams: OffersRequest,
    setOffersRequestParams: Dispatch<SetStateAction<OffersRequest>>,
    minPrice: number,
    maxPrice: number,
}

const PriceSlider = ({offersRequestParams, setOffersRequestParams, minPrice, maxPrice}: Props) => {
    const [sliderValues, setSliderValues] = useState<number[]>(
        offersRequestParams.minPrice
            ? [offersRequestParams.minPrice, offersRequestParams.maxPrice]
            : [minPrice, maxPrice])
    const debouncedValues = useDebounce(sliderValues,500)

    const marks = [
        {
            value: minPrice,
            label: `₪${minPrice}`
        },
        {
            value: maxPrice,
            label: `₪${maxPrice}`
        },
    ]
    const minDistance = (maxPrice - minPrice) / 5

    const hasUserChangedValues = useRef(false)
    const handleChange = (event: Event, value: number[], activeThumb: number) => {
        if (!hasUserChangedValues.current) hasUserChangedValues.current = true
        if (value[1] - value[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(value[0], maxPrice - minDistance)
                setSliderValues([clamped, clamped + minDistance])
            } else {
                const clamped = Math.max(minDistance + minPrice, value[1])
                setSliderValues([clamped - minDistance, clamped])
            }
        } else {
            setSliderValues(value)
        }

    }

    useEffect(() => {
        if (!hasUserChangedValues.current) return
        setOffersRequestParams(prev => ({...prev,minPrice:debouncedValues[0],maxPrice:debouncedValues[1]}))
    }, [debouncedValues]);

    return (
        <Box p={'0.5rem 1.5rem'} width={'15rem'}>
            <Typography fontWeight={"bold"}>Price range</Typography>
            <Slider
                value={sliderValues}
                onChange={handleChange}
                min={minPrice}
                max={maxPrice}
                step={0.1}
                valueLabelDisplay={"auto"}
                valueLabelFormat={value => value.toFixed(1)}
                color={"secondary"}
                marks={marks}
                disableSwap
            />
        </Box>
    );
};

export default PriceSlider;