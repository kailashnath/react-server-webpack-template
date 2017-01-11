import React from 'react';
import styles from './styles.scss';
import borders from './borders.scss';
import images from './images.scss';
import classNames from 'classnames';

export default () => {
    return (
        <div className={classNames(styles.red, borders.black)}>
            <img className={images.icon} />Hello from App :-)
        </div>
    );
};
