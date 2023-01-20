
import React, { useEffect, useReducer } from 'react';
import { Advantages, HhData, Htag, P, Product, Sort, Tag } from '../../components';
import TopPageComponentsProps from './TopPageComponentProps';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import { useScrollY } from '../../hooks/useScrollY';
export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentsProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
    const y = useScrollY();

    const setSort = (sorts: SortEnum) => {
        dispathSort({ type: sorts });
    };
    useEffect(() => {
        dispathSort({ type: 'reset', initialState: products });
    }, [products]);
    return (
        <div className={styles.wraper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='grey' size='m' aria-label='10 элементов'> {products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => (<Product layout product={p} key={p._id} />))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'> hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag='h2'> Преемущества</Htag>
                <Advantages advantages={page.advantages} />
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
            <Htag tag='h2' >Получаемые навыки</Htag>
            {page.tags.map(t => (<Tag key={t} color='primary'>{t}</Tag>))}
        </div>
    );
};