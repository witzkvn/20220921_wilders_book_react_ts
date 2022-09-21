import PropTypes from "prop-types";
import styles from "./skill.module.css";
import IWilderGrades from "../../interfaces/IWilderGrades";

const Skill = ({ title, grades }: IWilderGrades) => {
  return (
    <li className={styles.listItem}>
      {title || "No Skill Yet"}
      <span className={styles.grades}>{grades || 0}</span>
    </li>
  );
};

Skill.propTypes = {
  title: PropTypes.string,
  grades: PropTypes.number,
};

export default Skill;
