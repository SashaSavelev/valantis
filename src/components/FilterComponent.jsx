import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, Typography, Button, RadioGroup, FormControlLabel, TextField, FormControl, FormLabel } from '@mui/material';
import { fetchFilteredIds, fetchFields, fetchIds } from './../store/actions';

const FilterComponent = () => {
    const dispatch = useDispatch();
    const { fields, offset, limit } = useSelector(state => state.data);
    const [field, setField] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [showResetButton, setShowResetButton] = useState(false);

    useEffect(() => {
        dispatch(fetchFields());
    }, [dispatch]);

    const getRussianLabel = field => {
        const labelMappings = {
            brand: 'Бренд*',
            product: 'Товар',
            price: 'Цена',
        };

        return labelMappings[field] || field;
    };
    const handleFieldChange = event => {
        setField(event.target.value);
        setError('');
    };

    const handleValueChange = event => {
        setValue(event.target.value);
        setError('');
    };

    const handleSearch = () => {
        if (!field) {
            setError('Выберите поле для поиска');
            return;
        }

        if (!value.trim() && field == 'product') {
            setError('Введите значение');
            return;
        }

        let checkedValue = value;

        if (field === 'price') {
            checkedValue = parseFloat(value);

            if (isNaN(checkedValue)) {
                setError('Введите корректное числовое значение для цены');
                return;
            }
        }

        if (field === 'brand') {
            const normalizedBrand = value.trim().toLowerCase();
            if (normalizedBrand === 'null' || normalizedBrand === '') {
                checkedValue = null;
            } else {
                checkedValue = value;
            }
        }

        dispatch(fetchFilteredIds({ field, value: checkedValue }));
        setField('product');
        setValue('');
        setError('');
        setShowResetButton(true);
    };

    const handleReset = () => {
        dispatch(fetchIds({ offset: offset, limit: limit }));
        setField('');
        setValue('');
        setError('');
        setShowResetButton(false);
    };

    return (
        <FormControl
            className="filter-component"
            sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '70px', margin: '0 auto', color: 'white' }}
        >
            <FormLabel sx={{ color: 'rgb(255, 241, 241)', fontSize: '14px', flex: '1', textAlign: 'center' }}>Выберите категорию для поиска</FormLabel>

            <RadioGroup
                row
                value={field}
                onChange={handleFieldChange}
                sx={{ flex: '1', width: '40%', marginLeft: '10px', justifyContent: 'flex-start', marginRight: '0' }}
            >
                {fields.map((field, index) => (
                    <FormControlLabel
                        key={index}
                        value={field}
                        control={
                            <Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 14,
                                        color: 'rgb(255, 241, 241)',
                                    },
                                }}
                            />
                        }
                        sx={{ fontSize: '10px' }}
                        label={<span style={{ fontSize: '12px' }}>{getRussianLabel(field)}</span>}
                    />
                ))}
            </RadioGroup>

            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '10px', color: 'rgb(255, 241, 241)', flex: '1', marginRight: '10px' }}>
                * Пустая строка возвращает все товары без указанной категории.
            </Typography>

            <TextField
                label="Введите значение"
                variant="outlined"
                value={value}
                onChange={handleValueChange}
                style={{
                    marginTop: '10px',
                    width: '10%',
                    marginBottom: '10px',
                    fontSize: '10px',
                    color: 'rgb(255, 241, 241)',
                }}
                className="filter-input"
                InputProps={{
                    sx: { color: 'white' },
                }}
                InputLabelProps={{
                    sx: { color: 'white' },
                }}
                sx={{
                    flex: '1',
                    '& fieldset': {
                        borderColor: 'white !important',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white !important',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white !important',
                    },
                }}
            />

            {error && (
                <Typography variant="subtitle2" color="error" sx={{ pb: 1, fontSize: '10px', margin: '3px' }}>
                    {error}
                </Typography>
            )}

            <Button style={{ backgroundColor: 'grey', fontSize: '10px', marginLeft: '5px' }} variant="contained" onClick={handleSearch}>
                Поиск
            </Button>
            {showResetButton && (
                <Button
                    style={{
                        backgroundColor: '#f16b6b',
                        fontSize: '10px',
                        color: 'white',
                        textTransform: 'none',
                        marginLeft: '5px',
                    }}
                    variant="contained"
                    onClick={handleReset}
                >
                    Вернуться к товарам
                </Button>
            )}
        </FormControl>
    );
};

export default FilterComponent;
