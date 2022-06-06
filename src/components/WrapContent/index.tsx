import styles from './index.less';

const WrapContent: React.FC = (props) => {
  return (
    <div className={styles.wrapper} >{props.children}</div>
  )
};

export default WrapContent;
