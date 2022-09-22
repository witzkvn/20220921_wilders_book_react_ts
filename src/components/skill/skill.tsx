import PropTypes from "prop-types";
import styles from "./skill.module.css";
<<<<<<< HEAD
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
=======
import ISkillWithGrade from "../../interfaces/skills/ISkillWithGrade";

const Skill = ({ id, name, grades }: ISkillWithGrade) => {
    return (
        <li className={styles.listItem}>
            {name || "No Skill Yet"}
            <span className={styles.grades}>{grades || 0}</span>
        </li>
    );
};

Skill.propTypes = {
    name: PropTypes.string,
    grades: PropTypes.number,
>>>>>>> 52e607e35d47fa7744fcaacf12c68f346e859479
};

export default Skill;
