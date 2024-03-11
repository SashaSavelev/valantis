import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './paginator.scss';
import './../../styles.scss';
const Paginator = ({ currentPage, totalPages, changeCurrentPage }) => {
    const handleChange = (event, value) => {
        changeCurrentPage(value);
    };

    return (
        <div className="paginator">
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" mt={3}>
                <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
            </Stack>
        </div>
    );
};

export default Paginator;
