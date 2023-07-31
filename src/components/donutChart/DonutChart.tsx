import React from 'react';
import styles from './DonutChart.module.css';

interface DonutChartProps {
    percentage?: number
}

export function DonutChart ({percentage}: DonutChartProps) {
    const grad = `conic-gradient(#007Bff 0% ${percentage}%, #54A6FE ${percentage}% 100%)`;
    return (
        <div className={styles.outer} style={{background: grad}}>
            <div className={styles.inner}>
                <div className={styles.title}>
                    <p>$20.600</p>
                </div>
                <div className={styles.description}>
                    <p>total</p>
                </div>
            </div>
        </div>
    )
}