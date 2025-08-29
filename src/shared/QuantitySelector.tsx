import {Button, ButtonGroup, InputBase} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import type {Dispatch, SetStateAction} from "react";

interface Props {
    amount: number,
    setAmount: Dispatch<SetStateAction<number>>,
    maxValue: number,
}

const QuantitySelector = ({amount, setAmount, maxValue}: Props) => {
    const valueInDiapason = (value:number,min:number,max:number) => {
        return Math.min(Math.max(min,value),max)
    }
    const handleInputChange = (event) => {
        const val = event.target.value
        if (/^\d*$/.test(val)) {
            if (val === '') {
                setAmount(1)
            } else {
                const parsed = parseInt(val,10)
                setAmount(valueInDiapason(parsed,1,maxValue))
            }
        }
    }

    return (
        <ButtonGroup sx={{
            border: '1px solid #C7C2C1',
            height: '1.8rem',
            borderRadius: '0.5rem',
        }}>
            <Button
                disabled={amount <= 1}
                onClick={() => setAmount(valueInDiapason(amount-1,1,maxValue))}
                sx={{
                    color: 'black',
                    minWidth: '1rem',
                    p: '0',
                    '&:hover': {
                        backgroundColor: '#FFF9E8',
                        borderColor: 'black'
                    }
                }}>
                <RemoveIcon fontSize={'small'}/>
            </Button>
            <InputBase
                value={amount}
                onChange={handleInputChange}
                inputProps={{
                    style: {
                        width: '2.5rem',
                        textAlign: "center",
                        padding: '3px'
                    }
                }}
            />
            <Button
                onClick={() => setAmount(valueInDiapason(amount+1,1,maxValue))}
                disabled={amount >= maxValue}
                sx={{
                    color: 'black',
                    minWidth: '1rem',
                    p: '0',
                    '&:hover': {
                        backgroundColor: '#FFF9E8',
                        borderColor: 'black'
                    }
                }}>
                <AddIcon fontSize={'small'}/>
            </Button>
        </ButtonGroup>
    );
};

export default QuantitySelector;