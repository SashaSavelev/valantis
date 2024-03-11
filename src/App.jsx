import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIds, fetchItems } from './store/actions';

import Items from './components/Items';
import Header from './components/Header';
import Paginator from './components/Paginator';
import Loader from './components/Loader';
import './styles.scss';

function App() {
    const dispatch = useDispatch();
    const { ids, items, loadingIds, loadingItems, error, offset, limit } = useSelector(state => state.data);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;
    const [technicalError, setTechnicalError] = useState(false); 

    useEffect(() => {
        dispatch(fetchIds({ offset: offset, limit: limit }));
    }, [dispatch, offset, limit]);

    useEffect(() => {
        if (ids.length > 0 && loadingIds === 'fulfilled') {
            const firstProductIndex = (currentPage - 1) * itemsPerPage;
            const lastProductIndex = firstProductIndex + itemsPerPage;
            dispatch(fetchItems(ids.slice(firstProductIndex, lastProductIndex)));
        }
    }, [dispatch, ids, loadingIds, currentPage, itemsPerPage]);

    const changeCurrentPage = value => {
        setCurrentPage(value);
    };

    useEffect(() => {
  
        if (error) {
            setTechnicalError(true);
        }
    }, [error]);

    return (
        <>
            <div className="app-container">
                <Header />
                <div className="content-container">
                    {technicalError ? (
                        <div className="noFoundDiv">
                            <h1>Произошла техническая ошибка</h1>
                        </div>
                    ) : loadingIds === 'rejected' || loadingItems === 'rejected' ? (
                        <div className="noFoundDiv">
                            <h1>Проблемы с загрузкой данных с сервера</h1>
                        </div>
                    ) : loadingItems === 'loading' ? (
                        <Loader />
                    ) : (
                        <>
                            {ids.length === 0 ? (
                                <div className="noFoundDiv">
                                    <h1>К сожалению, мы не смогли найти ничего по Вашему запросу</h1>
                                </div>
                            ) : (
                                <Items items={items} />
                            )}
                        </>
                    )}
                </div>
                <Paginator currentPage={currentPage} totalPages={Math.ceil(ids.length / itemsPerPage)} changeCurrentPage={changeCurrentPage} />
            </div>
        </>
    );
}

export default App;